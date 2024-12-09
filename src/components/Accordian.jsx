import { useState } from "react";

const data = [
  {
    id: 1,
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces, primarily for single-page applications, where you can create reusable UI components.",
  },
  {
    id: 2,
    question: "What is the purpose of the `useEffect` hook?",
    answer:
      "The `useEffect` hook lets you perform side effects in function components, like fetching data, updating the DOM, or setting up subscriptions.",
  },
  {
    id: 3,
    question: "What is Node.js?",
    answer:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, allowing you to run JavaScript code outside the browser, typically for building backend services.",
  },
  {
    id: 4,
    question: "What is the difference between `var`, `let`, and `const`?",
    answer:
      "`var` is function-scoped and can be redeclared. `let` is block-scoped and cannot be redeclared within the same block. `const` is also block-scoped but is used for variables that should not be reassigned.",
  },
];

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelected(id === selected ? null: id);
  };
  const handleMultiSelection = (id) =>{
    const cpyMultiple = [...multiple];
    const findIndexOfId = cpyMultiple.indexOf(id);
    if(findIndexOfId === -1) cpyMultiple.push(id);
    else cpyMultiple.splice(findIndexOfId,1);
    setMultiple(cpyMultiple);
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col gap-5">
      <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)} className="bg-[#614101] text-white font-bold px-3 py-2">
        {enableMultiSelection ? "Disable Multi Selection" : "Enable Multi Selection"}
      
      </button>
      <div className="w-[500px]">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="bg-[#614101] mb-3 p-3">
              <div
                onClick={enableMultiSelection ? () => handleMultiSelection(item.id):() => handleSingleSelection(item.id)}
                className="text-white flex items-center justify-between cursor-pointer font-bold"
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {
                enableMultiSelection ? 
                multiple.includes(item.id) && 
                <div className="text-white h-auto">{item.answer}</div> 
                :
                selected === item.id && (
                  <div className="text-white h-auto">{item.answer}</div>
                ) 
              }
            </div>
          ))
        ) : (
          <div>Data not found</div>
        )}
      </div>
    </div>
  );
};
export default Accordian;
