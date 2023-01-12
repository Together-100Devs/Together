import React, { useContext } from "react";
//import { Context } from "contexts/Context";
import togetherLogo from "../.././assets/images/togetherLogo.svg";
import Modal from "./Modal";
import { useModalContext } from "contexts/ModalContext";


const RejectionModal = ({ handleClose }) => {
  const modal = useModalContext();
  return (
    <div className="flex flex-col items-center py-0 px-2rem rounded-xl bg-white pb-4">
        <button
          className="w-auto h-8 mt-5 px-2 border-solid border-2 border-gray outline-none rounded font-semibold text-lg hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300"
          onClick={handleClose}
        >
          Close
        </button>
      <div className="w-4/6 mt-3 flex flex-col">
        <img className="w-12 pr-2" src={togetherLogo} alt="" /> 
        <h2 className="mb-1 border-solid border-b-2 border-black font-semibold">
        </h2>
        <div>
          <h3>Unfortunately, only 100Devs users are allowed to login to add and delete events at this time. If you'd like to join click the link below!</h3>
        </div>
        <button
          className="w-auto h-8 mt-5 px-2 border-solid border-2 border-gray outline-none rounded font-semibold text-lg hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300"
        >
          <a href="https://discord.gg/100devs">Join 100 Devs</a>
        </button>
      </div>
    </div>
  );
};

  export default RejectionModal;