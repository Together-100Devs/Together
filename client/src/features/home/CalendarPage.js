import Calendar from "../calendar/Calendar";
import CalendarHeader from "../calendarHeader";

function CalendarPage() {
  return (
    <main className="flex flex-col gap-3 p-3 shadow-sm">
      <CalendarHeader />
      <Calendar />
    </main>
  );
}
export default CalendarPage;
