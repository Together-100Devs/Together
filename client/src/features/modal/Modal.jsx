import { AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";

const Modal = ({ children, context }) => {
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

  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      {context.isOpen && (
        <Backdrop onClick={context.handleClose}>
          <motion.div
            className="overflow-y-auto max-h-svh w-[clamp(50%,500px,90%)] md:w-[clamp(10%,500px,50%)] md:min-h-96 md:max-h-full"
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
