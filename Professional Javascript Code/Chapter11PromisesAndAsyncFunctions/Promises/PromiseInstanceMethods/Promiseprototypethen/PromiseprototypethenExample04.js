let p1 = Promise.resolve('foo');

// Calling then() with no handler function acts as a passthrough
let p2 = p1.then();

setTimeout(console.log, 0, p2);  // Promise <resolved>: foo

// These are equivalent
let p3 = p1.then(() => undefined);
let p4 = p1.then(() => { });
let p5 = p1.then(() => Promise.resolve());

setTimeout(console.log, 0, p3);  // Promise <resolved>: undefined
setTimeout(console.log, 0, p4);  // Promise <resolved>: undefined
setTimeout(console.log, 0, p5);  // Promise <resolved>: undefined 

// These are equivalent:
let p6 = p1.then(() => 'bar');
let p7 = p1.then(() => Promise.resolve('bar'));

setTimeout(console.log, 0, p6);  // Promise <resolved>: bar
setTimeout(console.log, 0, p7);  // Promise <resolved>: bar

// Promise.resolve() preserves the returned promise
let p8 = p1.then(() => new Promise(() => { }));
let p9 = p1.then(() => Promise.reject());
// Uncaught (in promise): undefined

setTimeout(console.log, 0, p8);  // Promise <pending>
setTimeout(console.log, 0, p9);  // Promise <rejected>: undefined 

let p10 = p1.then(() => { throw 'baz'; });
// Uncaught (in promise) baz

setTimeout(console.log, 0, p10);  // Promise <rejected> baz 

let p11 = p1.then(() => Error('qux'));

setTimeout(console.log, 0, p11);  // Promise <resolved>: Error: qux 