/**
 * @template T
 * @param {() => Promise<T>} fn
 * @param {import("react").DependencyList} deps
 */
import { useEffect, useState } from "react";

export default function useQuery(fn, deps) {
  const [state, setState] = useState({ status: "loading" });
  
  useEffect(() => {
    let ignore = false;
    
    setState({ status: "loading" });
    
    fn().then((data) => {
      if (ignore) {
        return;
      }
      
      setState({ status: "success", data });
    }).catch((error) => {
      if (ignore) {
        return;
      }
      
      setState({ status: "error", error });
    });
    
    return () => {
      ignore = true;
    };
  }, deps);
  
  return state;
}
