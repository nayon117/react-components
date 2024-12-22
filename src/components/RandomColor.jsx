import { useEffect, useState } from "react";

const RandomColor = () => {
  const [typeofColor,setTypeOfColor] = useState('hex');
  const [color,setColor] = useState('#000000');

  useEffect(()=>{
    if(typeofColor === 'hex') generateHexColor();
    else generatergbColor();
  },[typeofColor])

  const utilityFunc = (len) =>{
    return Math.floor(Math.random()*len);
  }
  const generateHexColor = () =>{
    const hex= [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    let hexColor = '#';
    for (let i = 0; i < 6; i++){
      hexColor += hex[utilityFunc(hex.length)];
    }
    setColor(hexColor);
  }
  const generatergbColor = () =>{
    const r = utilityFunc(256);
    const g = utilityFunc(256);
    const b = utilityFunc(256);
    setColor(`rgb(${r},${g},${b})`)
  }
  return (
    <div 
    style={{
      backgroundColor: color
    }} 
    className="w-full min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ease-in-out"
  >
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <button 
        onClick={() => setTypeOfColor('hex')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
      >
        Generate HEX Color
      </button>
      <button 
        onClick={() => setTypeOfColor('rgb')}
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
      >
        Generate RGB Color
      </button>
      <button 
        onClick={typeofColor === 'hex' ? generateHexColor : generatergbColor}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
      >
        Generate Random Color
      </button>
    </div>

    <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6 backdrop-blur-sm">
      <h3 className="text-3xl font-bold text-gray-800">{color}</h3>
    </div>
  </div>
  )
}
export default RandomColor;
