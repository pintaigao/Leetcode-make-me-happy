const obj = {
  name: "Alice",
  regular: function () {
    console.log("regular:", this.name);
  },
  arrow: () => {
    console.log("arrow:", this.name);
  }
};

obj.regular(); // regular: Alice
obj.arrow();   // arrow: undefined （浏览器里通常不是 obj）


// 2. 箭头函数没有 prototype 属性
function foo() { }
const bar = () => { };

console.log(foo.prototype); // 有
console.log(bar.prototype); // undefined


// 3. 箭头函数没有自己的 arguments, arguments: 函数的固定参数
function regular() {
  console.log(arguments);
}
regular(1, 2, 3); // [1, 2, 3]

const arrow = (...args) => {
  console.log(args);
};

arrow(1, 2, 3); // [1, 2, 3]


//4.箭头函数也不能用 call / apply / bind 改变 this
const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

function regular() {
  console.log(this.name);
}

const arrow = () => {
  console.log(this.name);
};

regular.call(obj1); // Alice
regular.call(obj2); // Bob

arrow.call(obj1);   // 不是 Alice，基本不会被改掉
arrow.call(obj2);   // 同样不会变