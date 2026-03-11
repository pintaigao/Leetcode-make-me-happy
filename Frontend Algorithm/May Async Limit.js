/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export function mapAsyncLimit(iterable, callbackFn, size) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    function processItem(index) {
      if (index === iterable.length) {
        resolve(results);
      }
      
      return callbackFn(iterable[index]).then((result) => {
        results.push(result);
        processItem(index + 1);
      }).catch(reject);
    }
    
    return processItem(0);
  });
}

export function mapAsyncLimit2(iterable, callbackFn, size = Infinity) {
  if (iterable.length === 0) {
    return Promise.resolve([]);
  }
  
  const currentChunk = iterable.slice(0, size), remainingItems = iterable.slice(size);
  
  return Promise.all(currentChunk.map(callbackFn)).then((results) =>
    mapAsyncLimit2(remainingItems, callbackFn, size).then((rest) => [...results, ...rest]),
  );
}

export async function mapAsyncLimit3(iterable, callbackFn, size = Infinity) {
  const results = [];
  
  for (let i = 0; i < iterable.length; i += size) {
    const chunk = iterable.slice(i, i + size);
    const chunkResults = await Promise.all(chunk.map(callbackFn));
    
    results.push(...chunkResults);
  }
  
  return results;
}

// Chunkless
export function mapAsyncLimit4(iterable, callbackFn, size = Infinity) {
  return new Promise((resolve, reject) => {
    let results = [], nextIndex = 0, resolved = 0;
    
    if (iterable.length === 0) {
      resolve(results);
      return;
    }
    
    function processItem(index) {
      nextIndex++;
      callbackFn(iterable[index]).then((result) => {
        results[index] = result;
        resolved++;
        
        if (resolved === iterable.length) {
          resolve(results);
          return;
        }
        
        if (nextIndex < iterable.length) {
          processItem(nextIndex);
        }
      }).catch(reject);
    }
    
    for (let i = 0; i < Math.min(iterable.length, size); i++) {
      processItem(i);
    }
  });
}

// Chunkless async/await
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  return new Promise((resolve, reject) => {
    let results = [], nextIndex = 0, resolved = 0;
    
    if (iterable.length === 0) {
      resolve(results);
      return;
    }
    
    async function processItem(index) {
      nextIndex++;
      try {
        results[index] = await callbackFn(iterable[index]);
        resolved++;
        
        if (resolved === iterable.length) {
          resolve(results);
          return;
        }
        
        if (nextIndex < iterable.length) {
          processItem(nextIndex);
        }
      } catch (err) {
        reject(err);
      }
    }
    
    for (let i = 0; i < Math.min(iterable.length, size); i++) {
      processItem(i);
    }
  });
}


// 使用
async function fetchUpperCase(q) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch('https://uppercase.com?q=' + encodeURIComponent(q));
  return await res.text();
}

// Only a maximum of 2 pending requests at any one time.
const results = await mapAsyncLimit(['foo', 'bar', 'qux', 'quz'], fetchUpperCase, 2);
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
