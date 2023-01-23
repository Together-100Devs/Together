import React from "react";
//import { Context } from "contexts/Context";
import { useAuthContext } from "contexts/AuthContext";
import togetherLogo from "../.././assets/images/togetherLogo.svg";



const WelcomeUserModal = ({ handleClose }) => {
  const auth = useAuthContext();
  return (
    <div className="flex flex-col items-center py-0 px-2rem rounded-xl bg-white pb-4">
        <button
          className="w-auto h-8 mt-5 px-2 border-solid border-2 border-gray outline-none rounded font-semibold text-lg hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300"
        onClick={() => { handleClose(); }}
        >
          Close
        </button>
      <div className="w-4/6 mt-3 flex flex-col ">
        <div className="mb-5">
        <img className="w-12 pr-2" src={togetherLogo} alt="" /> 

        </div>
        <div>
         <h3>Hello, {auth.user.displayName}, We are happy to welcome you in Together. 
            Looks, like you are all set! Cant wait for you to begin your journey with us!
          </h3>
        </div>
       
      </div>
    </div>
  );
};

  export default WelcomeUserModal;
  
