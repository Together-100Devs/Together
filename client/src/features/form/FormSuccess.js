
export default function FormSuccess() {
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="pb-5">Congratulations!</div>
        <div className="text-teal-700 text-lg font-semibold uppercase">
          Your Event has been added.
        </div>
        <a href="/" className="mt-10">
          <button className="h-10 px-5 font-semibold text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
            New Event
          </button>
        </a>
      </div>
    </div>
  );
}
