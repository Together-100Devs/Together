import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function HamburgerNav({ logo, logotext, links, isOpen, onToggle }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();

  let Links = [
    { name: "HOME", link: "/", type: "button" },
    { name: "CALENDAR", link: "calendar", type: "button" },
  ];

  if (!isAuthenticated()) {
    Links.push({ name: "LOG IN", link: "api/auth/discord", type: "a" });
  } else {
    Links.push({ name: "LOG OUT", action: logout, type: "function" });
  }

  // Use passed-in links OR fall back to Landingpage Links
  const menuItems = links || Links;

  const [internalOpen, setInternalOpen] = useState(false);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const toggle = onToggle || (() => setInternalOpen(!internalOpen));

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 md:hidden">
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggle}
        />
      )}
      <div className="flex bg-white py-6 px-7">
        <div className="cursor-pointer flex items-center">
          <img className="mr-1 pt-2 w-7" src={logo} alt="logo icon" />
          <img className="mr-1 pt-2 w-20" src={logotext} alt="logo text" />
        </div>
        <div
          onClick={toggle}
          className="text-3xl absolute right-8 top-6 cursor-pointer"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
        <ul
          className={`absolute z-50 left-0 w-full pl-9 transition-all duration-200 ease-in ${
            open ? "top-20" : "top-[-480px]"
          }`}
        >
          {menuItems.map((Link) => {
            return (
              <li key={Link.name} className="text-xl my-7">
                {Link.type === "button" && (
                  <button
                    onClick={() => navigate(Link.link)}
                    className=" cursor-pointer"
                  >
                    {Link.name}
                  </button>
                )}
                {Link.type === "a" && (
                  <a
                    href={Link.link}
                    className="text-gray-800 hover:text-grey-400 duration-500"
                  >
                    {Link.name}
                  </a>
                )}
                {Link.type === "function" && (
                  <button onClick={Link.action}>{Link.name}</button>
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
