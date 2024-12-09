import { useState } from "react";
import { Plus, Minus, X, Divide, RotateCcw, Clock } from 'lucide-react';

const initialState = {
  a: '',
  b: '',
};

function* generateId() {
  let id = 1;
  while (true) {
    yield id++;
  }
}
const getID = generateId();

export default function ModernCalculator() {
  const [inputState, setInputState] = useState({ ...initialState });
  const [result, setResult] = useState(0);
  const [histories, setHistories] = useState([]);
  const [restoredHistory, setRestoredHistory] = useState(null);

  const handleInputFields = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setInputState({
      ...inputState,
      [e.target.name]: isNaN(value) ? '' : value.toString(),
    });
  };

  const handleClearOps = () => {
    setInputState({ ...initialState });
    setResult(0);
  };

  const handleOperations = (operation) => {
    if (inputState.a === '' || inputState.b === '') {
      alert("Invalid input");
      return;
    }

    const a = parseFloat(inputState.a);
    const b = parseFloat(inputState.b);

    if (isNaN(a) || isNaN(b)) {
      alert("Invalid input");
      return;
    }

    const f = new Function(
      "operation",
      `
    return ${a} ${operation} ${b}
  `
    );
    const result = f(operation);
    setResult(result);

    const historyItem = {
      id: getID.next().value,
      inputs: { ...inputState },
      operation,
      result,
      date: new Date(),
    };
    setHistories([historyItem, ...histories]);
  };

  const handleRestoreBtn = (historyItem) => {
    setInputState({ ...historyItem.inputs });
    setResult(historyItem.result);
    setRestoredHistory(historyItem);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Result: {result}</h1>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Input</label>
            <div className="flex space-x-2">
              <input
                type="number"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={inputState.a}
                onChange={handleInputFields}
                name="a"
              />
              <input
                type="number"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={inputState.b}
                onChange={handleInputFields}
                name="b"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Operations</h3>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => handleOperations("+")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={() => handleOperations("-")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <Minus size={18} />
              </button>
              <button
                onClick={() => handleOperations("*")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => handleOperations("/")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <Divide size={18} />
              </button>
              <button
                onClick={handleClearOps}
                className="bg-red-100 hover:bg-red-200 text-red-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">History</h3>
            {histories.length === 0 ? (
              <p className="text-gray-500">There is no history</p>
            ) : (
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {histories.map((historyItem) => (
                  <li
                    key={historyItem.id}
                    className="bg-gray-50 rounded-lg p-3 text-sm"
                  >
                    <p className="font-medium">
                      Operation: {historyItem.inputs.a} {historyItem.operation}{" "}
                      {historyItem.inputs.b}, Result: {historyItem.result}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{historyItem.date.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleRestoreBtn(historyItem)}
                        disabled={
                          restoredHistory !== null &&
                          restoredHistory.id === historyItem.id
                        }
                        className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium hover:bg-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Restore
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

