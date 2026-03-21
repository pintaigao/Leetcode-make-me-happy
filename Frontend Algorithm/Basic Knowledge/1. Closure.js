/*
1. Closure

核心方程:
1. closure = function + lexicalEnvironment
2. result = currentLogic(capturedVariables)
3. nextState = previousState + currentOperation

形象理解:
- 函数负责 "做事"
- 词法环境负责 "记住变量"
- 闭包就是 "会做事的函数 + 不会忘记的背包"
*/

function printTitle(title) {
  console.log(`\n=== ${title} ===`);
}

printTitle('Example 1: 基础闭包');

function createMessage(name) {
  const rememberedName = name;
  const rememberedSentence = `Hello, ${rememberedName}!`;

  // closure = greet + { rememberedName, rememberedSentence }
  return function greet() {
    console.log('[Equation] closure = function + remembered variables');
    console.log(`[Memory] rememberedName = ${rememberedName}`);
    return rememberedSentence;
  };
}

const greetAlice = createMessage('Alice');
console.log(greetAlice());

printTitle('Example 2: 私有计数器');

function createCounter(start = 0) {
  let count = start;

  // nextState = previousState + 1
  return function increment() {
    const previousState = count;
    count = count + 1;
    console.log(
      `[Equation] nextState = previousState + 1 -> ${previousState} + 1 = ${count}`
    );
    return count;
  };
}

const counter = createCounter(0);
console.log(counter());
console.log(counter());
console.log(counter());

printTitle('Example 3: 参数也会被闭包记住');

function createMultiplier(multiplier) {
  return function multiply(value) {
    const result = value * multiplier;
    console.log(
      `[Equation] result = value * multiplier -> ${value} * ${multiplier} = ${result}`
    );
    return result;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));
console.log(triple(5));

printTitle('Example 4: 循环里的 var 和 let');
console.log('[var] 三个函数共享同一个变量 i');

const varCallbacks = [];
for (var i = 0; i < 3; i++) {
  varCallbacks.push(function showVar() {
    return i;
  });
}
console.log(varCallbacks[0](), varCallbacks[1](), varCallbacks[2]());

console.log('[let] 每次循环都会创建新的块级作用域');

const letCallbacks = [];
for (let j = 0; j < 3; j++) {
  letCallbacks.push(function showLet() {
    return j;
  });
}
console.log(letCallbacks[0](), letCallbacks[1](), letCallbacks[2]());

// 4. 用 Closure 模拟 private state in JavaScript
function createCounter() {
  let count = 0; // private state

  return {
    increment() {
      count++;
    },
    getCount() {
      return count;
    }
  };
}

const counter2 = createCounter();
counter2.increment();
console.log(counter2.getCount()); // 1
console.log(counter2.count); // undefined

// 5. 用 Closure 模拟 data encapsulation
function createBankAccount(initialBalance) {
  let balance = initialBalance; // encapsulated data

  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
      }
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
      }
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);

account.deposit(50);
account.withdraw(30);

// 外部只能通过 deposit、withdraw、getBalance 这些方法来操作数据。
console.log(account.getBalance()); // 120
// balance 没有暴露给外部，外部不能直接改，❌ account.balance = 1000000：
console.log(account.balance); // undefined

/*
面试速记:
- 闭包让内部函数访问外部函数的变量
- 外部函数执行结束后, 被引用的变量不会立刻销毁
- 常见用途: 私有变量、缓存、工厂函数、事件回调
- 注意: 闭包本身不是问题, 滥用才会造成不必要的内存占用
*/