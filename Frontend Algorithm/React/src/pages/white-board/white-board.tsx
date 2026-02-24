import { useEffect, useState } from "react";

function useDefault(defaultValue, initialValue) {
  const [value, setValue] = useState(initialValue);
  // const [originValue, setOriginValue] = useState(defaultValue);

  console.log(value)
  console.log(defaultValue)

  if (value === undefined || value === null) {
    return [defaultValue, setValue];
  }
  // if (value === undefined || value === null) {
  //   return [originValue, setValue];
  // }

  return [value, setValue];
}

export default function WhiteBoard() {
  const initialUser = { name: 'Marshall' };
  const defaultUser = { name: 'Mathers' };
  console.log("Will Call use Default");
  const [user, setUser] = useDefault(defaultUser, initialUser);

  function logUser() {
    console.log(setUser("New"))
  }

  function logDefaultUser() {
    console.log(user)
  }

  return (
    <div>
      <div>User: {user.name}</div>
      <input onChange={(e) => setUser({ name: e.target.value })} />
      <button onClick={() => setUser(null)}>reset</button>
      <button onClick={() => logUser()}>Log</button>
      <button onClick={() => logDefaultUser()}>Log Default</button>
    </div>
  );
}