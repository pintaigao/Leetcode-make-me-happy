// 1. Prototype chain inheritance
function Parent() {
  this.colors = ['red', 'blue'];
}

Parent.prototype.sayHi = function () {
  return 'hi';
};

function Child() { }

Child.prototype = new Parent();
// Child.prototype = Parent.prototype;

const c1 = new Child();
const c2 = new Child();

c1.colors.push('green');
// Child.prototype.colors.push('yellow'); // 直接修改原型上的属性

console.log(c1.colors); // ['red', 'blue', 'green']
console.log(c2.colors); // ['red', 'blue', 'green'] 共享了
console.log(c1.sayHi()); // hi

// 2.  Constructor borrowing
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.sayHi = function () {
  return 'hi';
};

function Child(name) {
  Parent.call(this, name);
}

const c3 = new Child('Tom');
const c4 = new Child('Jack');

c3.colors.push('green');

console.log(c3.name); // Tom
console.log(c4.name); // Jack
console.log(c3.colors); // ['red', 'blue', 'green']
console.log(c4.colors); // ['red', 'blue'] 不共享
console.log(c3.sayHi); // undefined

// 3. Combination inheritance
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.sayHi = function () {
  return `Hi, I am ${this.name}`;
};

function Child(name, age) {
  Parent.call(this, name); // 第一次
  this.age = age;
}

Child.prototype = new Parent(); // 第二次
Child.prototype.constructor = Child;

const c5 = new Child('Tom', 20);
const c6 = new Child('Jack', 22);

c5.colors.push('green');

console.log(c5.colors); // ['red', 'blue', 'green']
console.log(c6.colors); // ['red', 'blue']
console.log(c5.sayHi()); // Hi, I am Tom

// Method 4: Parasitic combination inheritance
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.sayHi = function () {
  return `Hi, I am ${this.name}`;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.getAge = function () {
  return this.age;
};

const c7 = new Child('Tom', 20);

console.log(c7.sayHi());   // Hi, I am Tom
console.log(c7.getAge());  // 20

// Method 5: ES6 class extends
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi, I am ${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  getAge() {
    return this.age;
  }
}

const c8 = new Child('Tom', 20);

console.log(c8.sayHi());  // Hi, I am Tom
console.log(c8.getAge()); // 20