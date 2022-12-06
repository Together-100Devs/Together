import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ModalCard from "./ModalCard";

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  
  return (
    <div>
      <motion.button
        className="py-0 px-4 mt-8 mr-auto mb-auto ml-5 bg-teal-600 text-black rounded focus:outline-none focus:ring focus:ring-teal-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (modalOpen ? close() : open())}
      >
        Click for Modal
      </motion.button>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <ModalCard modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
