import { Context } from "contexts/Context";
import { useContext } from "react";

const NavBtn = ({ Icon }) => {
  const [context, setContext] = useContext(Context);
  return (
    <div className="flex overflow-hidden rounded-lg my-3">
      <button
        className="block text-white text-xs bg-navBtn py-3 px-3 font-sans tracking-wide uppercase font-bold "
        onClick={() => {
          context.page = "calendarPage";
          setContext({ ...context });
        }}
      >
        Navigate to Calendar Page
      </button>
      <div class="bg-navBtnLight shadow-border p-3">
        <div class="w-4 h-4">
          <Icon />
        </div>
      </div>
    </div>
  );
};

export default NavBtn;
