/**
 * @param boolean initialValue
 * @return Object
 */
import { useState, useCallback } from 'react';

export default function useArray(defaultValue = []) {
  console.log("useArray", defaultValue);
  const [array, setArray] = useState(defaultValue);
  
  const push = (element) => {
    console.log("Call Push function", element);
    setArray((prevState) => [...prevState, element]);
  }
  
  // const push = useCallback((element) => {
  //   console.log("Call Pushed Array: ", element);
  //   return setArray((a) => [...a, element])
  // }, []);

  const filter = useCallback((callback) => setArray((prevState) => prevState.filter(callback)), []);

  const update = useCallback((index, newElement) => setArray((prevState) => [...prevState.slice(0, index), newElement, ...prevState.slice(index + 1, prevState.length)]), []);

  const remove = useCallback((index) => setArray((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1, prevState.length)]), []);

  const clear = useCallback(() => setArray([]), []);

  return { array, set: setArray, push, filter, update, remove, clear };
}