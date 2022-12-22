import ButtonLink from "features/buttonlink/ButtonLink";
import readingLadySVG from "../../../src/assets/images/readingLady.svg";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "features/calendar/Calendar";
import { useState } from "react";

function CalendarPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="flex px-3 py-5">
      <section className={`${isExpanded ? "flex-[.2]" : "flex-[.1]"}`}>
        <img src="/TogetherLogo.png" alt="Logo" />
        <nav className="w-[70%] mx-auto bg-orange-300 border border-black"></nav>
      </section>

      <section className={`${isExpanded ? "flex-[.8]" : "flex-[.9]"}`}>
        <div className="flex w-[90%] justify-end m-auto">
          <ButtonLink Icon={AiOutlineCalendar} className="bg-accent">
            Add to Calendar
          </ButtonLink>
          <img
            className="w-60 transform translate-y-4 space-x-5"
            src={readingLadySVG}
            alt="Reading Lady SVG"
          />
        </div>
        <Calendar />
      </section>
    </main>
  );
}
export default CalendarPage;
