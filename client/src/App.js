import LandingPage from "features/home/LandingPage";
// import Calendar from "features/calendar/Calendar";
// import LoginWithDiscord from "features/auth/LoginWithDiscord";
// import UserForm from "features/form/UserForm";

// <LoginWithDiscord />
//       <Calendar />
//       <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
//         <UserForm />
//       </div>

const App = () => (
  <div className="bg-primary overflow-hidden flex justify-center items-center h-screen">
    <div className="w-full xl:max-w-[1280px]">
      <LandingPage />
    </div>
  </div>
);

export default App;
