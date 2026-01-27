export default function debounce(func, wait) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    // Reset the timeout, restarting the wait period
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// 用法
const handleResize = debounce(() => {
  console.log('Window resized');
}, 3000);


// window.addEventListener('resize', handleResize);

// 说明
// 1. debounce 函数接受两个参数：要防抖的函数 func 和等待时间 wait（以毫秒为单位）。
// 2. 返回一个新的函数，该函数在被调用时会清除之前的定时器，并设置一个新的定时器。
// 3. 只有在等待时间内没有再次调用该函数时，才会执行传入的 func 函数。
// 4. 这样可以防止在短时间内频繁触发某个操作（如窗口调整大小、输入框输入等），提高性能。

// handleResize(); // 调用防抖函数
// 如果在 300 毫秒内没有再次调用 handleResize，则会输出 'Window resized'
setTimeout(() => {
  console.log("Calling handleResize again after 1 second");
  handleResize();
}, 1000); // 1 秒后再次调用
setTimeout(() => {
  console.log("Calling handleResize again after 2 seconds");
  handleResize();
}, 2000); // 2 秒后再次调用
setTimeout(() => {
  console.log("Calling handleResize again after 4 seconds");
  handleResize();
}, 4000); // 4 秒后再次调用
// 只有在最后一次调用后的 3 秒后，才会输出 'Window resized'