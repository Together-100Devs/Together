// import readingLadySVG from "../../assets/images/readingLady.svg";
import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrTableAdd } from "react-icons/gr";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import Calendar from "features/calendar/Calendar";
import { useState } from "react";
import SidebarItem from "features/sidebarItem";

function CalendarPage() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <main className="flex px-3 py-5 gap-2">
      <section
        className={`flex flex-col transition-all duration-200 ${
          isExpanded ? "w-[35%]" : "w-[8%]"
        }`}
      >
        <img className="w-32 mb-5 mx-auto" src="/TogetherLogo.png" alt="Logo" />
        <nav className="font-inconsolata font-bold text-xl overflow-hidden whitespace-nowrap w-[90%] mx-auto py-10 px-8 my-8 bg-orange-300 border-2 border-black rounded-2xl">
          <ul className="space-y-8">
            <SidebarItem
              isExpanded={isExpanded}
              Icon={BsCalendarPlusFill}
              text="Add to Calendar"
            />
            <SidebarItem
              isExpanded={isExpanded}
              Icon={MdGroupAdd}
              text="Join the Team"
            />
            <SidebarItem
              isExpanded={isExpanded}
              Icon={IoChatbubblesOutline}
              text="Feedback"
            />
            <SidebarItem
              isExpanded={isExpanded}
              Icon={FaQuestion}
              text="Help"
            />
            <SidebarItem
              isExpanded={isExpanded}
              Icon={RiArrowLeftCircleFill}
              text="Log out"
            />
          </ul>

          {isExpanded ? (
            <span
              className="cursor-pointer"
              onClick={() => setIsExpanded(prev => !prev)}
            >
              &lt;&lt; Collapse
            </span>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => setIsExpanded(prev => !prev)}
            >
              Expand &gt;&gt;
            </span>
          )}
        </nav>
        {/* <img className="w-60" src={readingLadySVG} alt="Reading Lady SVG" /> */}
      </section>

      <section className="transition-all duration-200">
        <div className="flex w-[90%] m-auto"></div>
        <Calendar />
      </section>
    </main>
  );
}
export default CalendarPage;
