import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
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
