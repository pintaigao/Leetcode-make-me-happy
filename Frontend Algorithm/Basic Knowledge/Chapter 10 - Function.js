// 1. 基础知识
const target = { foo: 'bar' };
const handler1 = {
  get(trapTarget, property, receiver) {
    return trapTarget[property];
  }
};

const handler2 = {
  // Traps are keyed by method name inside the handler object
  get() { return Reflect.get(...arguments) }
};

const proxy = new Proxy(target, handler);

console.log(proxy.foo);   // bar
console.log(target.foo);  // bar 

const handler3 = {
  get: Reflect.get // compare to the old way get(): return trapTarget[property];
};

const proxy3 = new Proxy(target, handler3);
const proxy4 = new Proxy(target, Reflect); // 直接使用 Reflect 作为 handler 对象

console.log(proxy4.foo);   // bar
console.log(target.foo);  // bar 

// 使用代理 modify the behavior of the target object
const target2 = {
  foo: 'bar',
  baz: 'qux'
};
const handler = {
  get(trapTarget, property, receiver) {
    let decoration = '';
    if (property === 'foo') {
      decoration = '!!!';
    }
    return Reflect.get(...arguments) + decoration;
  }
};
const proxy5 = new Proxy(target2, handler);
console.log(proxy5.foo); // bar!!!
console.log(target2.foo); // bar
console.log(proxy5.baz); // qux
console.log(target2.baz)

// Trap Invariants
const target6 = {};
Object.defineProperty(target6, 'foo', {
  configurable: false,
  writable: false,
  value: 'bar'
});
const handler6 = {
  get() {
    return 'qux';
  }
};
const proxy6 = new Proxy(target6, handler6);
console.log(proxy6.foo);
// TypeErro

// Revoke a Proxy
const target7 = {
  foo: 'bar'
};
const handler7 = {
  get() {
    return 'intercepted';
  }
};
const { proxy7, revoke } = Proxy.revocable(target7, handler7);
console.log(proxy7.foo); // intercepted
console.log(target7.foo); // bar
revoke();
console.log(proxy7.foo); // TypeError

// Status Flag
const o = {};

try {
  Object.defineProperty(o, 'foo', 'bar');
  console.log('success');
} catch (e) {
  console.log('failure');
}

if (Object.defineProperty(o, 'foo', 'bar')) {
  console.log('success');
} else {
  console.log('failure');
}

// 10.10 Function.prototype.apply() 和 Function.prototype.call()
function sum(num1, num2) {
  return num1 + num2;
}

function callSum1(num1, num2) {
  return sum.apply(this, arguments);  // passing in arguments object
}

function callSum2(num1, num2) {
  return sum.apply(this, [num1, num2]);  // passing in array
}

console.log(callSum1(10, 10));  // 20
console.log(callSum2(10, 10));  // 20



function callSum2(num1, num2) {
  return sum.call(this, num1, num2);
}

console.log(callSum2(10, 10));  // 20

window.color = 'red';
let o = {
  color: 'blue'
};

function sayColor() {
  console.log(this.color);
}

sayColor();             // red

sayColor.call(this);    // red
sayColor.call(window);  // red
sayColor.call(o);       // blue

