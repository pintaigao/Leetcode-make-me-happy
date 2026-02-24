const defaultValue = ['apple', 'banana'];
import useArray from "../../hooks/useArray.jsx"

export default function CustomHooks() {
  const { array, push, update, remove, filter, set, clear } = useArray(defaultValue);

  return (
    <div>
      <p>Fruits: {array.join(', ')}</p>
      <button onClick={() => push('orange')}>Add orange</button>
      <button onClick={() => update(1, 'grape')}>
        Change second item to grape
      </button>
      <button onClick={() => remove(0)}>Remove first</button>
      <button onClick={() => filter((fruit) => fruit.includes('p'))}>
        Keep fruits containing 'p'
      </button>
      <button onClick={() => set(defaultValue)}>Reset</button>
      <button onClick={clear}>Clear list</button>
    </div>
  );
}
