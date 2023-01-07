import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function HamburgerNav() {
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="w-full bg-white z-10 tablet:hidden">
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex justify-center px-3 py-3 md:py-5 md:block">
            <div className="md:hidden">
              <button
                className="p-2 rounded-md focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <FaBars /> : <FaTimes />}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                <a href="index.html">Home</a>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <a href="login.html">Log In</a>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <a href="calendar.html">Calendar</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HamburgerNav;
