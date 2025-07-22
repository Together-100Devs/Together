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
      className="flex items-center shrink-0 h-5 md:text-sm hover:bg-gray-200 cursor-pointer md:px-1"
    >
      <span
        className={`shrink-0 w-1 h-1 md:w-2 md:h-2 ${
          props.event.confirmed ? confirmedCss : unconfirmedCSss
        } rounded-full`}
      ></span>
      <span className="ml-0.5 md:ml-2 text-[8px] md:text-sm font-light leading-none whitespace-nowrap">
        {formatToLocalTime(props.event.startAt)}
      </span>
      <span className="ml-0.5 md:ml-2 text-[8px] md:text-sm font-medium leading-none truncate">
        {props.event.title}
      </span>
    </button>
  );
};

export default Event;
