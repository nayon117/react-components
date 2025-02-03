import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";
import Tooltip from "./Tooltip";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className=" mx-auto mt-28 p-10 text-center">
      <Tooltip text="Click to open the modal" position="top" >
      <button onClick={openModal} className="bg-slate-200 px-3 py-2 rounded-lg">
        Open Modal
      </button>
      </Tooltip>
      <AnimatePresence>
        {showModal && (
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 relative rounded-lg shadow-lg w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-xl"
              >
                <IoClose />{" "}
              </button>
              <h1 className="text-lg font-bold">Welcome to my Modal</h1>
              <p className="py-4">This Modal is built without library</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Modal;
