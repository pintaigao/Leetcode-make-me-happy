let p1 = new Promise(() => { });
let p2 = p1.then();
// p1.then() returns a new promise, which is resolved with the return value of the callback function passed to then().
// 这个新期约实例基于 onResovled处理程序的返回值构建。换句话说，该处理程序的返回值会通过
// Promise.resolve()包装来生成新期约。如果没有提供这个处理程序，则 Promise.resolve()就会
// 包装上一个期约解决之后的值。如果没有显式的返回语句，则 Promise.resolve()会包装默认的返回
// 值 undefined。
setTimeout(console.log, 0, p1);         // Promise <pending>
setTimeout(console.log, 0, p2);         // Promise <pending>
setTimeout(console.log, 0, p1 === p2);  // false
