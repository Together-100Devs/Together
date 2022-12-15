import ButtonLink from "features/buttonlink/ButtonLink";
import readingLadySVG from "../../../src/assets/images/readingLady.svg";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "features/calendar/Calendar";

function CalendarPage() {
  return (
    <main className="flex">
      <section className="flex-[.2]">
        <div className="w-[70%] mx-auto">
          <ButtonLink className="bg-teal">Log out</ButtonLink>
          <ButtonLink className="bg-teal">Help</ButtonLink>
        </div>
      </section>
      <section className="flex-[.7]">
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
