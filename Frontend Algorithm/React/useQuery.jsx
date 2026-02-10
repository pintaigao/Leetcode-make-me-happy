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

// 用例：
export default function Component({ param }) {
  const request = useQuery(async () => {
    const response = await getDataFromServer(param);
    return response.data;
  }, [param]);

  return (
    <div>
      {request.loading && <p>Loading...</p>}
      {request.error && <p>Error: {request.error.message}</p>}
      {request.data && <p>Data: {request.data}</p>}
    </div>
  );
}