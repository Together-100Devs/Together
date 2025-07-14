import { formatToLocalTime } from "../../utilities/calendar";
import { useModalContext } from "../../contexts/ModalContext";

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
      className="md:flex md:items-center shrink-0 h-5 text-xs md:text-sm hover:bg-gray-200"
    >
      <div className="flex items-center shrink-0 h-5 px-1 text-xs md:text-sm hover:bg-gray-200 max-md:mb-1">
        <span
          className={`shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 ${
            props.event.confirmed ? confirmedCss : unconfirmedCSss
          } rounded-full`}
        ></span>
        <span className="ml-1 md:ml-2 text-xs font-light md:leading-none md:whitespace-nowrap">
          {formatToLocalTime(props.event.startAt)}
        </span>
      </div>
      <span className="ml-1 md:ml-2 font-medium leading-none truncate">
        {props.event.title}
      </span>
    </button>
  );
};

export default Event;
