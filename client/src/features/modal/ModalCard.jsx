import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import togetherLogo from "../.././assets/images/togetherLogo.svg";
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
        <button
          className="w-auto h-12 px-2 border-solid border-2 border-gray outline-none rounded font-semibold text-xl"
          onClick={handleClose}
        >
          Close
        </button>
        <div className="w-fit m-3 flex flex-col">
          <h2 className=" flex border-solid border-b-2 border-black font-semibold">
            <img className="w-7 pr-2" src={togetherLogo} alt="" /> The Title
          </h2>
          <div className="dateTime">
            <p >
              <span className="font-semibold">Day:</span> Thursday, November 11,
              2022
            </p>
            <p className="flex justify-around">
              <span className="font-semibold ">Starts: 11:11</span>
              <span className="font-semibold">Ends: 12:00</span>
            </p>
          </div>
          <div className="description w-auto h-20 my-2 p-3 border-solid border-black border-2 rounded-xl bg-neutral-200/50">
            <p>Description</p>
          </div>
          <p>Repeat</p>
          <p>Location</p>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default ModalCard;
