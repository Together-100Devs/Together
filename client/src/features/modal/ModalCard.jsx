import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { GrCalendar } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import { IoIosRepeat } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

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
          className="w-auto h-12 mt-5 px-2 border-solid border-2 border-gray outline-none rounded font-semibold text-xl hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300"
          onClick={handleClose}
        >
          Close
        </button>
        <div className="w-4/6 mt-3 flex flex-col">
          <h2 className=" flex mb-1 border-solid border-b-2 border-black font-semibold">
            <img className="w-8 pr-2" src={togetherLogo} alt="" /> The Title
          </h2>
          <div className="dateTime">
            <section className="flex m-3 gap-1 font-semibold">
              <GrCalendar className="mt-1" />
              <span className="">Day:</span>{" "}
              <span>Thursday, November 11, 2022</span>
            </section>

            <section className="flex m-3 gap-1 font-semibold">
              <FaRegClock className="mt-1" />
              <span className=" "> Starts: 11:11</span>
              <span className="ml-9">Ends: 12:00</span>
            </section>
          </div>
          <div className="description w-auto h-20 my-2 p-2 border-solid border-black border-2 font-semibold rounded-xl bg-neutral-200/50">
            <p>Description:</p>
          </div>
          <div>
            <section className="flex m-3 gap-1 font-semibold">
              <IoIosRepeat className="mt-1" />
              <span>Repeats:</span>
            </section>

            <section className="flex m-3 gap-1 font-semibold">
              <IoLocationOutline className="mt-1" /> <span>Location:</span>
            </section>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default ModalCard;
