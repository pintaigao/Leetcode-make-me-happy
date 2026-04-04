// 8.1.1属性的类型
let person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";

person.sayName = function () {
  console.log(this.name);
};
// This example creates an object called person that has three properties(name, age, and job) and one method(sayName()).The sayName() method displays the value of this.name, which resolves to person.name.Early JavaScript developers used this pattern frequently to create new objects.A few years later, object literals became the preferred pattern for creating such objects.The previous example can be rewritten using object literal notation as follows:
let person = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  }
};

// Data Properties
let person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas"
});
console.log(person.name);  // "Nicholas"
person.name = "Greg";
console.log(person.name);  // "Nicholas"
// This example creates a property called name with a value of "Nicholas" that is read - only.The value of this property can’t be changed, and any attempts to assign a new value are ignored in nonstrict mode.In strict mode, an error is thrown when an attempt is made to change the value of a read - only property.

let person = {};
// None Deletable
// Here, setting configurable to false means that the property cannot be removed from the object.Calling delete on the property has no effect in nonstrict mode and throws an error in strict mode.Additionally, once a property has been defined as nonconfigurable, it cannot become configurable again.Any attempt to call Object.defineProperty() and change any attribute other than writable causes an error:
Object.defineProperty(person, "name", {
  configurable: false,
  value: "Nicholas"
});
console.log(person.name);  // "Nicholas"
delete person.name;
console.log(person.name);  // "Nicholas"

// Throws an error 如果想再次调用 Object.defineProperty() 来修改 name 属性的值，虽然 writable 是默认值 true，但由于 configurable 已经被设置为 false，所以会抛出一个错误：
Object.defineProperty(person, "name", {
  configurable: true,
  value: "Nicholas"
});
// So although you can call Object.defineProperty() multiple times for the same property, there are limits once configurable has been set to false. 

/* 8.1.2 Accessor Properties */
// Define object with pseudo-private member 'year_'
// and public member 'edition'
let book = { year_: 2017, edition: 1 };

// 这个 year 没有_
Object.defineProperty(book, "year", {
  get() {
    return this.year_;
  },

  set(newValue) {
    if (newValue > 2017) {
      this.year_ = newValue;
      this.edition += newValue - 2017;
    }
  }
});

book.year = 2018;
console.log(book.edition);  // 2
// In this code, an object book is created with two default properties: year_ and edition.The underscore on year_ is a common notation to indicate that a property is not intended to be accessed from outside of the object’s methods.The year property is defined to be an accessor property where the getter function simply returns the value of year_ and the setter does some calculation to determine the correct edition.So changing the year property to 2018 results in both year_ and edition changing to 2. This is a typical use case for accessor properties, when setting a property value results in some other changes to occur.


/* 8.1.2 Defining Multiple Properties */
/* 8.1.4 Merging Object */
let dest, src, result;
/**
 * Simple copy
 */
dest = {};
src = { id: 'src' };
result = Object.assign(dest, src);

// Object.assign mutates the destination object
// and also returns that object after exiting.
console.log(dest === result);  // true
console.log(dest !== src);     // true
console.log(result);           // { id: src }
console.log(dest);             // { id: src }

/**
 * Multiple source objects
 */
dest = {};
result = Object.assign(dest, { a: 'foo' }, { b: 'bar' });
console.log(result);  // { a: foo, b: bar }

/**
 * Getters and setters
 */
dest = { set a(val) { console.log(`Invoked dest setter with param ${val}`) } };
src = { get a() { console.log('Invoked src getter'); return 'foo' } };

Object.assign(dest, src);
// Invoked src getter
// Invoked dest setter with param foo

// Since the setter does not perform an assignment,
// no value is actually transferred
console.log(dest);  // { set a(val) {...} }

/**
 * Overwritten properties
 */
let dest, src, result;
dest = { id: 'dest' };
result = Object.assign(dest, { id: 'src1', a: 'foo' }, { id: 'src2', b: 'bar' });

// Object.assign will overwrite duplicate properties.
console.log(result);  // { id: src2, a: foo, b: bar }

// This can be observed by using a setter on the destination object:
dest = {
  set id(x) {
    console.log(x);
  }
};

Object.assign(dest, { id: 'first' }, { id: 'second' }, { id: 'third' });
// first
// second
// third

/**
 * Object references
 */

dest = {};
src = { a: {} };

Object.assign(dest, src);

// Shallow property copies means only object references copied.
console.log(dest);              // { a :{} }
console.log(dest.a === src.a);  // true 


/* 8.1.5 Object Identity and Equality */
// These are cases where === behaves as expected:
console.log(true === 1);   // false
console.log({} === {});    // false
console.log("2" === 2);    // false

// These have different representations in the JS engine and yet are treated as equal
console.log(+0 === -0);    // true
console.log(+0 === 0);     // true
console.log(-0 === 0);     // true

// To determine NaN equivalence, the profoundly annoying isNaN() is required
console.log(NaN === NaN);  // false
console.log(isNaN(NaN));   // true
console.log(Object.is(true, 1));   // false
console.log(Object.is({}, {}));    // false
console.log(Object.is("2", 2));    // false

// Correct 0, -0, +0 equivalence/nonequivalence:
console.log(Object.is(+0, -0));    // false
console.log(Object.is(+0, 0));     // true
console.log(Object.is(-0, 0));     // false

// Correct NaN equivalence:
console.log(Object.is(NaN, NaN));  // true


/* 8.1.6 Enhanced Object Literal Syntax */



