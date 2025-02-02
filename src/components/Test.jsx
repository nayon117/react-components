import  { useState } from "react";

export default function Counter() {
  let [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
