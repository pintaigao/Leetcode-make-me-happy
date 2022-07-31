/*
 * @lc app=leetcode id=1152 lang=javascript
 *
 * [1152] Analyze User Website Visit Pattern
 */

// @lc code=start
/**
 * @param {string[]} username
 * @param {number[]} timestamp
 * @param {string[]} website
 * @return {string[]}
 */
var mostVisitedPattern = function (username, timestamp, website) {
  let group = {};
  let N = username.length;
  for (let i = 0; i < N; i++) {
    let logs = group[username[i]] || [];
    let log = [username[i], timestamp[i], website[i]];
    logs.push(log);
    group[username[i]] ? group[username[i]].push(log) : (group[username[i]] = [log]);
  }

  dfs = (timer,logs,index,track) => {
    if (track.size() == 3) {
        timer.add(new LinkedList<>(track));
    } else {
        for (let i = index; i < logs.size(); i++) {
            track.add(logs.get(i).website);
            dfs(timer, logs, i + 1, track);
            track.removeLast();
        }
    }
}

  let result = [];
  for (let logs of Object.values(group)) {
    logs.sort((a, b) => a[1] - b[1]);
    let lists = new Set();
    dfs(lists, logs, 0, []);
    result.push(lists);
  }

  let merge = {};
  for (let i = 0; i < result.length; i++) {
    let linkedLists = result[i];
    for (let list of linkedLists) {
      merge[list] = (merge[list] || 0) + 1;
    }
  }

  let entries = Object.entries(merge);
  entries.sort((a, b) => {
    let [key1, value1] = a;
    let [key2, value2] = b;

    if (value1 === value2) {
      if (key1[0] == key2[0]) {
        if (key1[1] == key2[1]) return key1[2] < key2[2];
        else return key1[1] < key2[1];
      } else return key1[0] < key2[0];
    } else return value2 - value1;
  });

  return entries[0][0];
};

// @lc code=end
