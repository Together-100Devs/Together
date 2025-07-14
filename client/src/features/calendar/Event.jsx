import { useModalContext } from "../../contexts/ModalContext";
import { formatToLocalTime } from "../../utilities/calendar";

const Event = (props) => {
  const modal = useModalContext();
  const confirmedCss = "bg-gray-500";
  const unconfirmedCSss = "border border-gray-500";
  return (
    <button
      onClick={() => {
        modal.setActiveEvent(props.event);
        modal.handleOpen();
      }}
      key={props.event.title}
      className="flex items-center truncate text-clip md:text-ellipsis shrink-0 h-5 px-1 text-sm hover:bg-gray-200 cursor-pointer"
    >
      <span
        className={`shrink-0 w-2 h-2 ${
          props.event.confirmed ? confirmedCss : unconfirmedCSss
        } rounded-full hidden md:inline`}
      ></span>
      <span className="ml-2 text-xs font-light leading-none whitespace-nowrap hidden md:inline">
        {formatToLocalTime(props.event.startAt)}
      </span>
      <span className="md:ml-2 font-medium leading-none md:truncate ">
        {props.event.title}
      </span>
    </button>
  );
};

export default Event;
