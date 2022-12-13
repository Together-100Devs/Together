import React, { useContext } from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { GrCalendar } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import { IoIosRepeat } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { Context } from "contexts/Context";
import { format, parseISO } from "date-fns";

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
  const [context] = useContext(Context)
  console.log(context.event)
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className="modal flex flex-col items-center py-0 px-2rem rounded-xl bg-white pb-4"
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
            <img className="w-8 pr-2" src={togetherLogo} alt="" /> {context.event.title}
          </h2>
          <div className="dateTime">
            <section className="flex m-3 gap-1 font-semibold">
              <GrCalendar className="mt-1" />
              <span className="">Day:</span>{" "}
              <span>{format(parseISO(context.event.startAt), 'M')}/{format(parseISO(context.event.startAt), 'd')}/{format(parseISO(context.event.startAt), 'y')}</span>
            </section>

            <section className="flex m-3 gap-1 font-semibold">
              <FaRegClock className="mt-1" />
 <span className=" "> Starts: {formatToLocalTime(context.event.startAt)}</span>
 <span className="ml-9">Ends: {formatToLocalTime(context.event.endAt)}</span>
            </section>
          </div>
          <div className="description break-words w-auto min-h-20 my-2 p-2 border-solid border-black border-2 font-semibold rounded-xl bg-neutral-200/50">
            <p>Description: {context.event.description}</p>
          </div>
          <div>
            <section className="flex m-3 gap-1 font-semibold">
              <IoIosRepeat className="mt-1" />
              <span>
                Repeats:
                {context.event.recurring ? <div>{context.event.recurringPattern.days.join(', ')}, {context.event.recurringPattern.rate}</div> : <div>Does not repeat.</div>}
              </span>
            </section>
            <section className="flex m-3 gap-1 font-semibold">
              <IoLocationOutline className="mt-1" /> <span>Location: {context.event.location}</span>
            </section>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default ModalCard;
