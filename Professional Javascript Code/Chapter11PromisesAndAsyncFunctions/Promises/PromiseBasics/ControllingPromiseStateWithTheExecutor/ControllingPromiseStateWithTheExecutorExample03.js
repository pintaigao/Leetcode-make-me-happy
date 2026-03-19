let p = new Promise((resolve, reject) => setTimeout(resolve, 1000));
let p2 = new Promise((resolve, reject) => setTimeout(console.log, 0, 'executor'));
let p3 = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'executor2'));

// When this console.log executes, the timeout callback has not yet executed:
// executor
setTimeout(console.log, 0, p);  // timeout 0 ~ 999: Promise <pending>, timeout 1000: Promise <undefined>
setTimeout(console.log, 0, p2);  // Promise <pending>
setTimeout(console.log, 999, p3);  // Promise <pending>
setTimeout(console.log, 1000, p3);  // Promise <executor2>
