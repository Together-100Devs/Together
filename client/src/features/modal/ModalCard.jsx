import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

const ModalCard = ({ handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className="modal flex flex-col items-center py-0 px-2rem rounded-xl bg-white"
        onClick={e => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        ModalCard
        <button className="w-auto h-12 border-none outline-none rounded font-semibold text-xl" onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

export default ModalCard;
