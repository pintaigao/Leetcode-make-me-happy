// Throttle：固定时间内只允许执行一次
export default function throttle(func, wait) {
  let lastTime = 0;
  
  return (...args) => {
    const now = Date.now();
    
    if (now - lastTime >= wait) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

// 具体应用 scrolling 或者 submit Form
const throttledSubmit = throttle(submitForm, 2000);

button.addEventListener("click", throttledSubmit);