/*
2. Scope Chain

一句话理解:
作用域链 = 变量查找时, 按“当前作用域 -> 外层作用域 -> 更外层作用域 -> 全局作用域”一层层往外找的路径。

你可以把它理解成“逐层向外问人”:
- 先问自己这层有没有
- 没有就问上一层
- 再没有就继续往外问
- 最后还找不到, 就报错

核心特性:
1. 读取变量时会沿着作用域链查找
2. 变量遮蔽(shadowing)会让内层变量优先被使用
3. 函数定义的位置决定它能看到哪些外层变量
4. 作用域链不是“函数调用顺序”, 而是“词法结构”
*/

function section(title) {
  console.log(`\n=== ${title} ===`);
}

section('Example 1: 最基础的向外查找');

const globalName = 'global';

function outer() {
  const outerName = 'outer';

  function inner() {
    const innerName = 'inner';

    console.log('innerName ->', innerName);
    console.log('outerName ->', outerName);
    console.log('globalName ->', globalName);
    console.log(
      '[说明] inner 先找自己, 再找 outer, 最后找到全局变量 globalName'
    );
  }

  inner();
}

outer();

section('Example 2: 变量遮蔽, 内层优先');

const value = 'global value';

function showShadowing() {
  const value = 'outer value';

  function readValue() {
    const value = 'inner value';
    console.log('value ->', value);
    console.log('[说明] 内层同名变量会把外层变量“遮住”');
  }

  readValue();
  console.log('outer scope value ->', value);
}

showShadowing();
console.log('global value ->', value);

section('Example 3: 找不到变量时会报错');

function tryToReadMissing() {
  try {
    console.log(notExist);
  } catch (error) {
    console.log('error name ->', error.name);
    console.log('error message ->', error.message);
    console.log('[说明] 一直向外找, 直到全局都没有, 就会抛 ReferenceError');
  }
}

tryToReadMissing();

section('Example 4: 作用域链来自“定义位置”, 不是“调用位置”');

const site = 'global-site';

function makeReader() {
  const site = 'makeReader-site';

  return function reader() {
    console.log('site ->', site);
    console.log(
      '[说明] reader 看到的是它定义时外层的 site, 而不是谁调用它就看谁的 site'
    );
  };
}

const readSite = makeReader();

function callReader() {
  const site = 'callReader-site';
  readSite();
}

callReader();
console.log('global site ->', site);

section('Example 5: 块级作用域也会参与查找');

const mode = 'global';

{
  const mode = 'block';

  function insideBlock() {
    console.log('mode ->', mode);
    console.log('[说明] 这里先在函数内部找, 再沿着外层块级作用域向外找');
  }

  insideBlock();
}

console.log('global mode ->', mode);

section('Example 6: for 循环里的作用域链');

const callbacks = [];

for (let i = 0; i < 3; i++) {
  const label = `index-${i}`;

  callbacks.push(function () {
    console.log(`i = ${i}, label = ${label}`);
  });
}

callbacks[0]();
callbacks[1]();
callbacks[2]();

/*
面试速记:
- 作用域链决定了变量查找顺序
- 查找顺序是“从内到外”
- 同名变量时, 内层覆盖外层
- 作用域链由词法结构决定, 不是由函数在哪里被调用决定
- 闭包之所以能记住外部变量, 也离不开作用域链
*/
