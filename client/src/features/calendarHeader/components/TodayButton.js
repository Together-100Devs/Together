function TodayButton({ text, tooltipText, ...rest }) {
  return (
    <button
      className="relative p-2 px-4 bg-teal-light shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-lg font-inconsolata font-bold"
      {...rest}
    >
      <span className="text-lg font-bold">{text}</span>
      <span className="absolute -bottom-full left-1/2 -translate-x-1/2 translate-y-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in bg-teal-light p-2 border border-black whitespace-nowrap rounded-md pointer-events-none">
        {tooltipText}
      </span>
    </button>
  );
}
export default TodayButton;
