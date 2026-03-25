function Person(name, age = 18) {
  this.name = name;
  this.age = age;

  // 写到实例上
  this.getName = function () {
    console.log(`this.name = ${this.name}`);
  };

  this.sayHi = function () {
    console.log("Hi, I'm " + this.name + ", I'm " + this.age + " years old");
  }

  // 这里面的 getAge 只是 构造函数内部的普通函数，并没有挂到实例上，也没有挂到原型上，所以外面根本调不到：
  function getAge() {
    console.log(`this.age = ${this.age}`);
  }
}

// 写到原型上（更推荐）
Person.prototype.sayHi = function () {
  console.log("Hi, I'm " + this.name);
};

Person.prototype.getNameAndAge = function () {
  console.log(this.name + ", " + this.age);
}

Person.age = 30; // 给构造函数添加一个静态属性 age
// 注意这里的 this 是指向 Person 的, 因为 getAge 是 Person 的静态方法, 所以 this.age 实际上是 Person.age
Person.getAge = function () {
  return this.age; // 30
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");

p1.sayHi(); // Hi, I'm Alice, I'm 18 years old
p1.__proto__.sayHi(); // Hi, I'm Alice
p2.sayHi(); // Hi, I'm Bob
p1.getName();
p1.getNameAndAge();
console.log(p1.getName === Person.prototype.getName);
console.log(Person.getAge()); // 30
console.log("================================================================================================================================");

// 1. 每个函数都有一个 prototype 属性, 用于实现原型链
console.log(p1.__proto__ === Person.prototype); // true
console.log(p2.__proto__ === Person.prototype); // true
console.log(p1.sayHi === p1.__proto__.sayHi); // 如果Person里面没有 this.sayHi定义在构造函数内部，true，如果有，false

// 2. Person.prototype 默认会有一个 constructor，指回 Person 本身。
console.log(Person.prototype.constructor === Person); // true
console.log(Person.__proto__ === Function.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
// 1. 原型链是对象之间的链接, 用于属性查找
// 2. 每个对象都有一个隐式链接 __proto__, 指向它的原型对象
// 3. 当访问一个属性时, 会沿着 __proto__ 链向上查找, 直到找到该属性或者到达链的末尾 (null)

// 面试速记:
// - 原型链是对象之间的链接, 用于属性查找
// - 每个对象都有一个隐式链接 __proto__, 指向它的原型对象
// - 当访问一个属性时, 会沿着 __proto__ 链向上查找, 直到找到该属性或者到达链的末尾 (null)

// 更多 example:
// 1. 原型上的方法, 实例也可以直接调用
console.log(p1.sayHi === p2.sayHi); // true
console.log(p1.hasOwnProperty("sayHi")); // false 但是如果 Person 有this.sayHi 定义在构造函数内部, 就是 true
console.log("sayHi" in p1); // true

// 2. 实例先找自己身上的属性, 找不到再去原型上找
Person.prototype.age = 18;
console.log(p1.age); // 18
p1.age = 20;
console.log(p1.age); // 20
console.log(p2.age); // 18
console.log(p1.hasOwnProperty("age")); // true
console.log(p2.hasOwnProperty("age")); // false

// 3. 原型链最终会走到 Object.prototype
console.log(p1.toString === Object.prototype.toString); // true
console.log(p1.__proto__.__proto__ === Object.prototype); // true
console.log(p1.__proto__.__proto__.__proto__ === null); // true

// 4. instanceof 本质上是在判断原型链上能不能找到构造函数的 prototype
console.log(p1 instanceof Person); // true
console.log(p1 instanceof Object); // true
console.log(Person instanceof Function); // true
console.log(Function instanceof Function); // true

// 5. constructor / prototype / __proto__ 的关系
console.log(p1.__proto__.constructor === Person); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Person.prototype.constructor === Person); // true

// 6. 自定义一个更直观的例子
function Animal(type) {
  this.type = type;
}

Animal.prototype.eat = function () {
  console.log(this.type + " is eating");
};

const dog = new Animal("dog");
console.log(dog.type); // dog
dog.eat(); // dog is eating
console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true

// 7. 访问不存在的属性时, 最后会得到 undefined
console.log(p1.notExist); // undefined
console.log("notExist" in p1); // false


console.log("======================");
console.log(Object.prototype.toString === Object.toString); // false

