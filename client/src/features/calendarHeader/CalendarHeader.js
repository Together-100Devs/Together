function CalendarHeader() {
  return (
    <header className="flex items-center p-5 bg-white justify-between">
      <section>
        <button>Add Event</button>
        <button>Join TEam</button>
      </section>
      <section>Month Component</section>
      <section>
        <button>Feedback</button>
        <button>Help</button>
        <button>Logout</button>
      </section>
    </header>
  );
}
export default CalendarHeader;
