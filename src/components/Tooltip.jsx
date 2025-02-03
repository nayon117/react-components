import { useState } from "react";

const Tooltip = ({children, text, position = "top" }) => {
  const [visible, setVisible] = useState(false);
  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {children}
      {visible && (
        <div
        className={`absolute bg-black text-white p-2 rounded-md shadow-md z-10 ${
          position === "top"
            ? "bottom-full mb-2 left-1/2 transform -translate-x-1/2"
            : "top-full mt-2 left-1/2 transform -translate-x-1/2"
        }`}
        >
          {text}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
