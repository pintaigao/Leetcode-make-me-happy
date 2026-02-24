/**
 * Client-side Rate Limiter (Web)
 * Rules:
 *  - 2 requests / second (token bucket, capacity 2)  -> queued
 *  - 10 requests / day / account (fixed window)      -> rejected
 *
 * Notes:
 *  - Uses localStorage so refresh won't reset.
 *  - Best-effort only; user can tamper with storage.
 */

function createRateLimiter(options) {
  options = options || {};
  var perSecond = options.perSecond || 2;
  var bucketCapacity = options.bucketCapacity || perSecond; // allow burst up to 2
  var dailyLimit = options.dailyLimit || 10;
  var storagePrefix = options.storagePrefix || "rl:";
  var useUTC = options.useUTC !== false; // default true

  // In-tab queue to avoid race conditions within a single page
  var queue = [], draining = false;

  function nowMs() {
    return Date.now();
  }

  function dayKey(ts) {
    var d = new Date(ts);
    if (useUTC) {
      var y = d.getUTCFullYear(), m = String(d.getUTCMonth() + 1).padStart(2, "0"), day = String(d.getUTCDate()).padStart(2, "0");

      return y + "-" + m + "-" + day;
    } else {
      var y2 = d.getFullYear(), m2 = String(d.getMonth() + 1).padStart(2, "0"), day2 = String(d.getDate()).padStart(2, "0");

      return y2 + "-" + m2 + "-" + day2;
    }
  }

  function kRate(accountId) {
    return storagePrefix + "rate:" + accountId;
  }
  function kDaily(accountId) {
    return storagePrefix + "daily:" + accountId;
  }

  function safeParse(json, fallback) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return fallback;
    }
  }

  // ---- Token bucket state (persisted) ----
  function readBucket(accountId) {
    var raw = localStorage.getItem(kRate(accountId)), s = safeParse(raw, null);

    if (!s || typeof s !== "object") {
      return { tokens: bucketCapacity, lastRefillMs: nowMs() };
    }
    if (typeof s.tokens !== "number") s.tokens = bucketCapacity;
    if (typeof s.lastRefillMs !== "number") s.lastRefillMs = nowMs();
    // clamp
    s.tokens = Math.max(0, Math.min(bucketCapacity, s.tokens));
    return s;
  }

  function writeBucket(accountId, state) {
    localStorage.setItem(kRate(accountId), JSON.stringify(state));
  }

  function refillBucket(state, now) {
    var elapsedMs = now - state.lastRefillMs;
    if (elapsedMs <= 0) return state;

    var refill = (elapsedMs / 1000) * perSecond;
    var newTokens = Math.min(bucketCapacity, state.tokens + refill);

    state.tokens = newTokens;
    state.lastRefillMs = now;
    return state;
  }

  function msUntilNextToken(state) {
    // if tokens < 1, how long until it reaches 1
    if (state.tokens >= 1) return 0;
    var missing = 1 - state.tokens;
    var seconds = missing / perSecond;
    return Math.ceil(seconds * 1000);
  }

  // ---- Daily quota (persisted) ----
  function readDaily(accountId, now) {
    var raw = localStorage.getItem(kDaily(accountId));
    var s = safeParse(raw, null);
    var today = dayKey(now);

    if (!s || typeof s !== "object") {
      return { day: today, count: 0 };
    }
    if (s.day !== today) {
      return { day: today, count: 0 };
    }
    if (typeof s.count !== "number") s.count = 0;
    s.count = Math.max(0, Math.floor(s.count));
    return s;
  }

  function writeDaily(accountId, state) {
    localStorage.setItem(kDaily(accountId), JSON.stringify(state));
  }

  function canUseDaily(accountId, now) {
    var s = readDaily(accountId, now);
    return s.count < dailyLimit;
  }

  function consumeDaily(accountId, now) {
    var s = readDaily(accountId, now);
    if (s.count >= dailyLimit) return false;
    s.count += 1;
    writeDaily(accountId, s);
    return true;
  }

  // ---- Core decision: when can we run next? ----
  function tryConsumeRateToken(accountId, now) {
    var bucket = readBucket(accountId);
    bucket = refillBucket(bucket, now);

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      writeBucket(accountId, bucket);
      return { ok: true, waitMs: 0 };
    }

    // not enough tokens: compute wait time (do not change token count)
    writeBucket(accountId, bucket); // persist updated lastRefillMs
    return { ok: false, waitMs: msUntilNextToken(bucket) };
  }

  // ---- Public APIs ----
  function schedule(accountId, taskFn) {
    return new Promise(function (resolve, reject) {
      queue.push({ accountId: accountId, taskFn: taskFn, resolve: resolve, reject: reject });
      drain();
    });
  }

  function drain() {
    if (draining) return;
    draining = true;

    (function loop() {
      if (queue.length === 0) {
        draining = false;
        return;
      }

      var item = queue[0];
      var now = nowMs();

      // 1) daily quota: reject immediately if exceeded
      if (!canUseDaily(item.accountId, now)) {
        queue.shift();
        item.reject(new Error("Daily quota exceeded (" + dailyLimit + "/day)."));
        // continue draining
        loop();
        return;
      }

      // 2) per-second token bucket: wait if needed
      var rate = tryConsumeRateToken(item.accountId, now);
      if (!rate.ok) {
        setTimeout(loop, Math.max(0, rate.waitMs));
        return;
      }

      // 3) consume daily AFTER we decide to send (you can move this to "after success" if you prefer)
      var tookDaily = consumeDaily(item.accountId, now);
      if (!tookDaily) {
        // Extremely rare due to queue, but keep it safe
        queue.shift();
        item.reject(new Error("Daily quota exceeded (" + dailyLimit + "/day)."));
        loop();
        return;
      }

      // 4) run task
      queue.shift();
      Promise.resolve()
        .then(function () {
          return item.taskFn();
        })
        .then(function (res) {
          item.resolve(res);
          loop();
        })
        .catch(function (err) {
          item.reject(err);
          loop();
        });
    })();
  }

  function getStatus(accountId) {
    var now = nowMs();
    var daily = readDaily(accountId, now);
    var bucket = refillBucket(readBucket(accountId), now);

    return {
      perSecond: { tokens: bucket.tokens, capacity: bucketCapacity },
      daily: { day: daily.day, used: daily.count, limit: dailyLimit, remaining: Math.max(0, dailyLimit - daily.count) }
    };
  }

  function reset(accountId) {
    localStorage.removeItem(kRate(accountId));
    localStorage.removeItem(kDaily(accountId));
  }

  return { schedule: schedule, getStatus: getStatus, reset: reset };
}

/* ----------------- Example usage ----------------- */

// Create limiter: 2/sec, 10/day/account
var limiter = createRateLimiter({ perSecond: 2, dailyLimit: 10 });

// Wrap fetch:
function limitedFetch(accountId, url, options) {
  return limiter.schedule(accountId, function () {
    return fetch(url, options);
  });
}

// Example:
limitedFetch("acct_123", "/api/something").then(function (r) { return r.json(); }).then(function (data) { console.log("OK", data); }).catch(function (e) { console.error("Blocked/Failed:", e.message); });

// Check status:
console.log(limiter.getStatus("acct_123"));