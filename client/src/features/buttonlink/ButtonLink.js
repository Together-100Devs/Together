function ButtonLink({ children, Icon, className, ...rest }) {
  return (
    <div className="bg-teal-lightest p-3 font-inconsolata text-2xl font-bold rounded-lg border border-black h-min self-center my-5 mx-auto">
      <button
        className={`flex justify-center items-center w-full py-2 px-4 rounded-md border border-black tracking-[.2ch] ${className}`}
        {...rest}
      >
        {Icon && <Icon className="mr-2" />}
        {children}
      </button>
    </div>
  );
}
export default ButtonLink;
