import useDate from "hooks/useDate";
import Calendar from "../calendar/Calendar";
import CalendarHeader from "../calendarHeader";

function CalendarPage() {
  const date = useDate();

  return (
    <main className="flex flex-col gap-3 p-3 shadow-sm min-h-screen">
      <CalendarHeader date={date} />
      <Calendar date={date} />
    </main>
  );
}
export default CalendarPage;
