import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import './App.css'
import routerConfig from "./router";
// import Pages from "./pages/pages.tsx";

function App() {
  const [count, setCount] = useState(5)
  function handleSetCount() {
    setCount(() => {
      return 2;
    })
  }

  return (
    // <>
    //   <h3>{count}</h3>
    //   <button onClick={() => handleSetCount()}>Button From the Top</button>
    //   <Pages
    //     count={count}
    //     setCount={setCount}>
    //   </Pages>
    // </>
    <RouterProvider router={routerConfig}></RouterProvider>
  )
}

export default App
