import useDate from "hooks/useDate";
import Calendar from "../features/calendar/Calendar";
import CalendarHeader from "../features/calendarHeader";
import FormProvider from "contexts/FormContext";
import Modal from "features/modal/Modal";
import UserForm from "features/form/UserForm";
import { useAuthContext } from "contexts/AuthContext";
import { useFormModalContext } from "contexts/FormModalContext";
import EventModal from "features/modal/EventModal";
import { useModalContext } from "contexts/ModalContext";
import RejectionModal from "features/modal/RejectionModal";
import { useRef } from "react";

function CalendarPage() {
  const auth = useAuthContext();
  const date = useDate();
  const formModal = useFormModalContext();
  const modal = useModalContext();
  const canScrollMonthRef = useRef(true);

  const handleWheelScroll = e => {
    if (!canScrollMonthRef.current) return;
    canScrollMonthRef.current = false;

    if (e.deltaY > 0) {
      date.getNextMonth();
    } else {
      date.getPreviousMonth();
    }
    setTimeout(() => {
      canScrollMonthRef.current = true;
    }, 200);
  };

  return (
    <FormProvider>
      <main
        onWheel={handleWheelScroll}
        className="flex flex-col gap-3 p-3 shadow-sm min-h-screen max-w-[1920px] mx-auto"
      >
        <CalendarHeader date={date} />
        <Calendar date={date} />
      </main>
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        <Modal context={modal}>
          <EventModal />
        </Modal>
        <Modal context={formModal}>
          {auth?.user ? (
            <UserForm />
          ) : (
            <RejectionModal handleClose={formModal.handleClose} />
          )}
        </Modal>
      </div>
    </FormProvider>
  );
}
export default CalendarPage;
