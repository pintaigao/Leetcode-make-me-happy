async function foo() {
  console.log(await Promise.resolve('foo'));
}

async function bar() {
  console.log(await 'bar');
}

async function baz() {
  console.log('baz');
}

foo().then((value) => {
  console.log(value); // undefined
});
bar();
baz();

// baz
// bar
// foo
