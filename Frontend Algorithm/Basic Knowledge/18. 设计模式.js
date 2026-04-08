// 1. Singleton Pattern
const Store = (function () {
  let instance;

  function createInstance() {
    return {
      state: {},
      set(key, value) {
        this.state[key] = value;
      },
      get(key) {
        return this.state[key];
      }
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const store1 = Store.getInstance();
const store2 = Store.getInstance();

store1.set("user", "Alice");
console.log(store2.get("user")); // Alice
console.log(store1 === store2); // true

// Factory Pattern
function createButton(type) {
  if (type === "primary") {
    return {
      color: "blue",
      text: "Primary Button"
    };
  }

  if (type === "danger") {
    return {
      color: "red",
      text: "Danger Button"
    };
  }

  return {
    color: "gray",
    text: "Default Button"
  };
}

const btn1 = createButton("primary");
const btn2 = createButton("danger");

console.log(btn1); // { color: 'blue', text: 'Primary Button' }
console.log(btn2); // { color: 'red', text: 'Danger Button' }

// 3. Observer Pattern
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  notify(data) {
    this.observers.forEach(fn => fn(data));
  }
}

const subject = new Subject();

subject.subscribe((data) => {
  console.log("Observer 1:", data);
});

subject.subscribe((data) => {
  console.log("Observer 2:", data);
});

subject.notify("Hello");

// 4. Publisher-Subscriber Pattern
const EventBus = {
  events: {},

  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  },

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(data));
    }
  }
};

EventBus.on("login", (user) => {
  console.log("Header updated:", user.name);
});

EventBus.on("login", (user) => {
  console.log("Track login event:", user.name);
});

EventBus.emit("login", { name: "Alice" });

// 5. Decorator Pattern
function logDecorator(fn) {
  return function (...args) {
    console.log("Before function call");
    const result = fn(...args);
    console.log("After function call");
    return result;
  };
}

function sayHi(name) {
  console.log("Hi,", name);
}

const decoratedSayHi = logDecorator(sayHi);
decoratedSayHi("Alice");

// 6. Proxy Pattern
function multiply(...args) {
  console.log("Calculating...");
  return args.reduce((acc, cur) => acc * cur, 1);
}

function proxyMultiply() {
  const cache = {};

  return function (...args) {
    const key = args.join(",");
    if (cache[key]) {
      return cache[key];
    }
    const result = multiply(...args);
    cache[key] = result;
    return result;
  };
}

const calc = proxyMultiply();

console.log(calc(2, 3, 4)); // Calculating... 24
console.log(calc(2, 3, 4)); // 24 (from cache)

// 7. Strategy Pattern
const strategies = {
  isRequired(value) {
    return value ? "" : "This field is required";
  },
  minLength(value, length) {
    return value.length >= length ? "" : `Minimum length is ${length}`;
  }
};

function validate(value, rules) {
  for (const rule of rules) {
    const error = strategies[rule.type](value, rule.length);
    if (error) return error;
  }
  return "";
}

console.log(validate("", [{ type: "isRequired" }]));
console.log(validate("ab", [{ type: "minLength", length: 3 }]));

// 8. Adapter Pattern
const apiData = {
  user_name: "Alice",
  user_age: 25
};

function adaptUser(data) {
  return {
    name: data.user_name,
    age: data.user_age
  };
}

const user = adaptUser(apiData);
console.log(user); // { name: 'Alice', age: 25 }