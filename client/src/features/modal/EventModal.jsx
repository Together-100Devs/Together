import { GrCalendar, GrLanguage } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { format, parseISO } from "date-fns";
import { formatToLocalTime } from "../../utilities/calendar";
import togetherLogo from "../.././assets/images/togetherLogo.svg";
import { useModalContext } from "../../contexts/ModalContext";
import dataService from "../../services/dataService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEventsContext } from "../../contexts/EventsContext";

// URLRegex matches strings that look like URLs, including:
// 1. URLs starting with "http://" or "https://" (e.g., "https://example.com/path")
// 2. URLs starting with "www." (e.g., "www.example.com")
// 3. Bare domain names without protocol or www (e.g., "example.com")

const URLRegex =
  /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:[^\s]*))/g;

const LinkText = ({ children }) => {
  if (typeof children !== "string")
    throw new Error("LinkText can only accept a string as children");

  const separated = children.split(URLRegex);

  return separated.map((res, index) => {
    if (URLRegex.test(res)) {
      let href;

      // Determine href and always enforce HTTPS
      if (res.startsWith("https://")) {
        href = res;
      } else if (res.startsWith("http://")) {
        href = res.replace(/^http:\/\//, "https://");
      } else if (res.startsWith("www.")) {
        href = `https://${res}`;
      } else {
        href = `https://${res}`;
      }

      // Convert Unicode domain to punycode for display
      let displayURL;
      try {
        const urlObj = new URL(href);
        displayURL = urlObj.toString(); // toString() converts hostname to punycode
      } catch {
        displayURL = href; // fallback if URL parsing fails
      }

      return (
        <a
          key={`${res}-${index}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {displayURL}
        </a>
      );
    }
    return res;
  });
};

const EventModal = () => {
  const { setEvents } = useEventsContext();
  const modal = useModalContext();
  const { user } = useAuthContext();
  const canDelete =
    // if user is author of event, or user is moderator, they can delete an event
    (user && user?._id === modal.activeEvent.user?._id) || user?.isModerator;

  return (
    <div className="flex flex-col items-center py-0 px-2rem rounded-xl bg-white pb-4">
      <button
        className="w-auto h-12 mt-5 px-2 border-solid border-2 border-gray outline-hidden rounded-sm font-semibold text-xl hover:bg-teal-600 active:bg-teal-700 focus:outline-hidden focus:ring-3 focus:ring-teal-300"
        onClick={modal.handleClose}
      >
        Close
      </button>
      {canDelete && (
        <button
          className="w-auto h-12 mt-5 px-2 border-solid border-2 border-gray outline-hidden rounded-sm font-semibold text-xl hover:bg-teal-600 active:bg-teal-700 focus:outline-hidden focus:ring-3 focus:ring-teal-300"
          onClick={() =>
            dataService
              .deleteEvent(modal.activeEvent._id)
              .then(modal.handleClose)
              .then(() =>
                setEvents((prev) =>
                  prev.filter((el) => el._id !== modal.activeEvent._id)
                )
              )
          }
        >
          Delete Specific Event
        </button>
      )}
      {canDelete && modal.activeEvent.groupId && (
        <button
          className="w-auto h-10 mt-5 px-2 border-solid border-2 border-gray outline-hidden rounded-sm font-semibold text-xl hover:bg-teal-600 active:bg-teal-700 focus:outline-hidden focus:ring-3 focus:ring-teal-300 inline-block"
          onClick={() =>
            dataService
              .deleteAllEvents(modal.activeEvent.groupId)
              .then(modal.handleClose)
              .then(() =>
                setEvents((prev) =>
                  prev.filter((el) => el.groupId !== modal.activeEvent.groupId)
                )
              )
          }
        >
          Delete All Events
        </button>
      )}
      <div className="w-4/6 mt-3 flex flex-col">
        <h2 className=" flex mb-1 border-solid border-b-2 border-black font-semibold">
          <img className="w-8 pr-2" src={togetherLogo} alt="" />{" "}
          {modal.activeEvent.title}
        </h2>
        <div className="dateTime">
          <section className="flex m-3 gap-1 font-semibold">
            <GrCalendar className="mt-1" />
            <span className="">Day:</span>{" "}
            <span>
              {format(parseISO(modal.activeEvent.startAt), "M")}/
              {format(parseISO(modal.activeEvent.startAt), "d")}/
              {format(parseISO(modal.activeEvent.startAt), "y")}
            </span>
          </section>

          <section className="flex m-3 gap-1 font-semibold">
            <FaRegClock className="mt-1" />
            <span className=" ">
              {" "}
              Starts: {formatToLocalTime(modal.activeEvent.startAt)}
            </span>
            <span className="ml-9">
              Ends: {formatToLocalTime(modal.activeEvent.endAt)}
            </span>
          </section>

          <section className="flex m-3 gap-1 font-semibold">
            <GrLanguage className="mt-1" />
            <span className="">Timezone:</span>{" "}
            <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
          </section>
        </div>
        <h3 className="mb-0">Description:</h3>{" "}
        <div className="description break-words w-auto min-h-20 mb-2 p-2 border-solid border-black border-2 font-semibold rounded-xl bg-neutral-200/50">
          <p>
            <LinkText>{modal.activeEvent.description}</LinkText>
          </p>
        </div>
        <div>
          {/* <section className="flex m-3 gap-1 font-semibold">
            <IoIosRepeat className="mt-1" />
            <span>
              Repeats:
              {modal.activeEvent.recurring ? <div>{modal.activeEvent.recurringPattern.days.join(', ')}, {modal.activeEvent.recurringPattern.rate}</div> : <div>Does not repeat.</div>}
            </span>
          </section> */}
          <section className="flex m-3 gap-1 font-semibold">
            <IoLocationOutline className="mt-1" />{" "}
            <span>
              Location:{" "}
              <a
                href={modal.activeEvent.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {modal.activeEvent.location}
              </a>
            </span>
          </section>
          {user ? (
            <>
              <section className="flex m-3 gap-1 font-semibold">
                <IoPersonOutline className="mt-1" />{" "}
                <span>
                  Event Author:{" "}
                  {modal.activeEvent.user?.displayName || "Deleted"}
                </span>
              </section>
            </>
          ) : (
            <span className="flex m-3 gap-1 font-semibold">
              {" "}
              Event Author: Must be logged in to view author{" "}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
