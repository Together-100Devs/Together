import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import LogoContainer from "../features/home/LogoContainer";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:justify-center items-center w-full lg:pt-20 min-h-screen pb-10 md:pt-5 lg:text-lg  bg-primary">
      <div className="flex flex-col items-center gap-10 w-full p-4 max-w-xl md:max-w-3xl lg:max-w-5xl lg:gap-20 xl:max-w-7xl">
        <div className="flex justify-between w-full h-20">
          <LogoContainer logo={"./logoicon.png"} logotext={"./logotext.png"} />
        </div>
        <div className="border-solid border-2 border-black rounded-2xl bg-secondary   flex flex-col lg:flex-row w-full min-h-48  p-6">
          <div className=" h-full w-full flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-bold">
              Oops, looks like you are lost ...
            </h1>
            {/* Home Button */}
            <button
              onClick={() => navigate("/")}
              className="bg-white border-2 border-black rounded-2xl flex flex-row gap-2 justify-center items-center p-3  focus:ring-4 focus:ring-black"
            >
              <div className="flex justify-center">
                <FaHome className="text-mainBlue w-7 h-7 lg:w-10 lg:h-10" />
              </div>
              <div className="text-mainBlue font-black text-lg lg:text-xl xl:text-2xl">
                <span>Home</span>
              </div>
            </button>
          </div>
          <div className=" h-full w-full flex flex-row items-start justify-center ">
            <img src="404-pic.png" alt="404 image" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
