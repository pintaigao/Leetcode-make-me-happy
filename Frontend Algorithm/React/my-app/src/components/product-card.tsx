function ProductCard({data, setData, handleData}) {
  
  function handleSetData() {
    console.log("Call handleSetData from child");
    let newData = {
      key: data.key,
      isSelected: true,
      count: data.count + 1,
    }
    handleData(data.key, newData)
  }
  
  function setNewState() {
    console.log("Call setNewState from child");
    
    let newData = {
      key: data.key,
      isSelected: true,
      count: 100
    }
    
    setData(prevDatas => {
      console.log("THis is the Data")
      console.log(prevDatas);
      
      return prevDatas.map(item => {
        if (item.key === data.key) {
          return {
            ...item,
            count: newData.count,
            isSelected: newData.isSelected,
          };
        }
        return item; // 其他项原样返回
      });
    });
  }
  
  
  function logData() {
    console.log(data)
  }
  
  return (
    <div>
      <p>{data.key}</p>
      <p>{data.isSelected}</p>
      <p>{data.count}</p>
      <button onClick={() => handleSetData()}>Change Data</button>
      <button onClick={() => setNewState()}>Set Data</button>
      <button onClick={() => logData()}>Log Data</button>
      <p>================================================</p>
    </div>
  )
}

export default ProductCard;