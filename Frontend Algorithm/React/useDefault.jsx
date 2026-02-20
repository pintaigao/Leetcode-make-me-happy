export default function useDefault(defaultValue, initialValue) {
  const [value, setValue] = useState(initialValue);

  if (value === undefined || value === null) {
    return [defaultValue, setValue];
  }

  return [value, setValue];
}