// Event Loop 经典例子
console.log("1");

setTimeout(() => { console.log("5") }, 100);

// Promise.resolve() 之后的 then 会被放入微任务队列，优先于 resolve 的 setTimeout 的回调函数执行
Promise.resolve(setTimeout(() => { console.log("4") }, 10)).then(
  // 因为 resolve了 setTimeout as value，在这里执行 value
  (value) => { console.log("3") }
);

console.log("2");

// 另外一个例子
console.log("1");
setTimeout(() => { console.log("5") }, 0);
// Promise.resolve()里面的东西和外面的是平级的，所以会和log("1")和log("3")一起执行
Promise.resolve(console.log("2")).then(() => { console.log("4") });
// 然后 Micro task(微任务) -> Macrotask(宏任务)
console.log("3");

// 另外一个例子
console.log("start");

setTimeout(() => { console.log("timeout") }, 0);

Promise.resolve().then(() => {
  console.log("promise1");
}).then(() => {
  console.log("promise2");
});

console.log("end");

// 结果：
// start
// end
// promise1
// promise2
// timeout

// 另一个例子
setTimeout(() => {
  console.log("timer1");
  // setTimeout 的回调函数执行时，Promise.resolve() 之后的 then 会被放入微任务队列，优先于 下面的 setTimeout 的回调函数执行
  Promise.resolve().then(() => {
    console.log("promise1");
  });
}, 0);

setTimeout(() => {
  console.log("timer2");
}, 0);