function HeaderButton({ Icon, tooltipText, ...rest }) {
  return (
    <div className="relative inline-block group">
      <button
        className="p-2 sm:p-3 bg-[#F5E7DE] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] rounded-lg font-inconsolata font-bold cursor-pointer"
        {...rest}
      >
        <Icon className="max-[380px]:w-4 max-[380px]:h-4 w-6 h-6 sm:w-8 sm:h-8 text-[#C57756]" />
      </button>
      <span className="absolute -bottom-full left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 ease-in bg-[#F5CEB5BF] p-2 border border-black whitespace-nowrap rounded-md pointer-events-none z-10">
        {tooltipText}
      </span>
    </div>
  );
}
export default HeaderButton;
