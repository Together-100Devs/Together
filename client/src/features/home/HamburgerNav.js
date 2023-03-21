import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuthContext } from "contexts/AuthContext";

function HamburgerNav({ logo, logotext }) {
  const { isAuthenticated, logout } = useAuthContext();

  let Links = [
    { name: "HOME", link: "landingPage", type: "button" },
    { name: "CALENDAR", link: "calendarPage", type: "button" },
  ];

  if (!isAuthenticated()) {
    Links.push({ name: "LOG IN", link: "/auth/discord", type: "a" });
  } else {
    Links.push({ name: "LOG OUT", onClick: logout, type: "button" });
  }

  let [open, setOpen] = useState(false);

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 md:hidden">
      <div className="flex bg-white py-6 px-7">
        <div className="cursor-pointer flex items-center">
          <img className="mr-1 pt-2 w-7" src={logo} alt="logo icon" />
          <img className="mr-1 pt-2 w-20" src={logotext} alt="logo text" />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
        <ul
          className={`absolute bg-white z-[-1] left-0 w-full pl-9 transition-all duration-200 ease-in ${
            open ? "top-20" : "top-[-480px]"
          }`}
        >
          {Links.map(Link => {
            return (
              <li key={Link.name} className="text-xl my-7">
                {Link.type === "button" && (
                  <button onClick={Link.onClick}>{Link.name}</button>
                )}
                {Link.type === "a" && (
                  <a
                    href={Link.link}
                    className="text-gray-800 hover:text-grey-400 duration-500"
                  >
                    {Link.name}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default HamburgerNav;
