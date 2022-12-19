import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import EventModal from "./EventModal";
import { Context } from "contexts/Context";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";

const Modal = () => {
  const [context, setContext] = useContext(Context)

  const toggleModal = () => {
    context.modalOpen = !context.modalOpen
    setContext({ ...context })
  }

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
    <div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {context.modalOpen &&
          <Backdrop onClick={toggleModal}>
            <motion.div
              className="modal"
              onClick={e => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EventModal modalOpen={context.modalOpen} handleClose={toggleModal} />
            </motion.div>
          </Backdrop>
        }
      </AnimatePresence>
    </div>
  );
};

export default Modal;
