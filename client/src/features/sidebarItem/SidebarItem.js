function SidebarItem({ Icon, text, isExpanded, ...rest }) {
  return (
    <li className={`relative flex space-x-5 items-center`} {...rest}>
      {Icon && (
        <Icon
          className={`w-10 h-10 transition-all duration-[300ms] ${
            isExpanded ? "mx-0" : "mx-1"
          }`}
        />
      )}
      <span
        className={`absolute left-10 transition-opacity  ${
          isExpanded
            ? "duration-200 delay-[300ms] opacity-1"
            : "opacity-0 duration-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
}
export default SidebarItem;
