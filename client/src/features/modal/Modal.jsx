import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalCard from "./ModalCard";
import { Context } from "contexts/Context";

const Modal = () => {
  const [context, setContext] = useContext(Context)

  const toggleModal = () => {
    context.modalOpen = !context.modalOpen
    setContext({ ...context })
  }

  return (
    <div>
      <motion.button
        className="py-0 px-4 mt-8 mr-auto mb-auto ml-5 bg-teal-600 text-black rounded focus:outline-none focus:ring focus:ring-teal-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleModal}
      >
        Click for Modal
      </motion.button>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {context.modalOpen && <ModalCard modalOpen={context.modalOpen} handleClose={toggleModal} />}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
