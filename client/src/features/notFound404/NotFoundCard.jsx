import "index.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFoundCard({ heading, img }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="border-solid border-2 border-black rounded-2xl bg-secondary   flex flex-col lg:flex-row w-full min-h-48  p-6">
        <div className=" h-full w-full flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold">{heading}</h2>
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
          <img src={img} alt="404 image" className="" />
        </div>
      </div>
    </>
  );
}
