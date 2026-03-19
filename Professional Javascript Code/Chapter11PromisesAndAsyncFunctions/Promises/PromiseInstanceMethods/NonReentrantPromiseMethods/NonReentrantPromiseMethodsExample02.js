let synchronousResolve;

// Create a promise and capture the resolve function in a local variable
let p = new Promise((resolve) => {
  console.log('0: initial resolve()');
  synchronousResolve = function () {
    console.log('1: invoking resolve()');
    resolve();
    console.log('2: resolve() returns');
  };
});

let q = Promise.resolve(console.log("0.1: initial resolve()"))

p.then(() => console.log('4: then() handler executes'));

synchronousResolve(); // call这个触发 resolve()，p.then 才会执行
console.log('3: synchronousResolve() returns');

// Actual output:
// 1: invoking resolve()
// 2: resolve() returns
// 3: synchronousResolve() returns
// 4: then() handler executes 

// Explanation:
// When synchronousResolve() is called, it logs '1: invoking resolve()', then calls resolve(), which fulfills the promise. However, the .then() handler does not execute immediately; it is scheduled to run after the current call stack is empty. Therefore, '2: resolve() returns' and '3: synchronousResolve() returns' are logged before the .then() handler executes and logs '4: then() handler executes'. This demonstrates that promise resolution is asynchronous, even when resolve() is called synchronously.

// 解释
// 当调用 synchronousResolve() 时，它首先输出 '1: invoking resolve()'，然后调用 resolve()，这会使 promise 被 fulfill。然而，.then() 处理程序不会立即执行；它被安排在当前调用栈清空后运行。因此，'2: resolve() returns' 和 '3: synchronousResolve() returns' 会在 .then() 处理程序执行并输出 '4: then() handler executes' 之前被记录下来。这表明，即使 resolve() 是同步调用的，promise 的解析也是异步的。


