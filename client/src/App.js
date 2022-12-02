import React from "react";
import Calendar from "features/calendar/Calendar";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";

function App() {
  return (
    <div>
      <LoginWithDiscord />
      <Calendar />
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        <UserForm />
      </div>
      <Modal/>
    </div>
  );
}

export default App;
