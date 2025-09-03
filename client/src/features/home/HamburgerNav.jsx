import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormModalContext } from "../../contexts/FormModalContext";

function HamburgerNav({ logo, logotext, links }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthContext();
  const formModal = useFormModalContext();

  const getDefaultLinks = () => {
    const defaultLinks = [{ name: "HOME", link: "/", type: "button" }];
    if (location.pathname.includes("calendar")) {
      defaultLinks.push({
        name: "ADD EVENT",
        action: formModal.handleOpen,
        type: "function",
      });
    } else {
      defaultLinks.push({
        name: "CALENDAR",
        link: "/calendar",
        type: "button",
      });
    }

    if (!isAuthenticated()) {
      defaultLinks.push({
        name: "LOG IN",
        link: "api/auth/discord",
        type: "a",
      });
    } else {
      defaultLinks.push({ name: "LOG OUT", action: logout, type: "function" });
    }

    return defaultLinks;
  };

  const menuItems = links || getDefaultLinks();

  const [open, setOpen] = useState(false);

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
