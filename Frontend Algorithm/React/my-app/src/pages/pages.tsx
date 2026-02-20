import { useState, useEffect } from "react";
import ProductCard from "../components/product-card.tsx";

let flag = false;
function Pages({count, setCount}) {
  const [datas, setDatas] = useState([{
    key:1,
    count: 1,
    isSelected: false,
  },{
    key:2,
    count: 1,
    isSelected: false,
  },{
    key:3,
    count: 1,
    isSelected: false,
  }]);
  
  useEffect(() => {
    console.log(flag)
    if (flag) {
      console.log("Call here useEffect")
    }
    
    return () => {
      flag = true;
      console.log("Unload useEffect")
    }
  }, [datas]);
  
  function muteCount() {
    console.log("Call mute count")
    count+=1;
    console.log(count)
  }
  
  function handleSetCount() {
    console.log(count)
    setCount(count + 1)
  }
  
  function handleSetData(id, data){
    console.log("Call handle set Data");
    
    setDatas(prevDatas =>
      prevDatas.map(item => {
        if (item.key === id) {
          return {
            ...item,
            count: data.count,
            isSelected: data.isSelected,
          };
        }
        return item; // 其他项原样返回
      })
    );
  }
  
  return (
    <>
      <p>{count}</p>
      <p>This is a Button</p>
      <button onClick={() => muteCount()}>Button</button>
      <button onClick={() => handleSetCount()}>Set Button</button>
      <p>======================</p>
      {datas.map((data) => (
        <ProductCard
          data={data}
          setData={setDatas}
          handleData={(id, data) => handleSetData(id, data)}
        ></ProductCard>
      ))}
    </>
  )
}

export default Pages;