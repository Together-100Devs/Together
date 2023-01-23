import React from "react";

import { useAuthContext } from "client/contexts/AuthContext";
import FormProvider from "client/contexts/FormContext";
import { useFormModalContext } from "client/contexts/FormModalContext";
import { useModalContext } from "client/contexts/ModalContext";
import Calendar from "client/features/calendar/Calendar";
import CalendarHeader from "client/features/calendarHeader";
import UserForm from "client/features/form/UserForm";
import EventModal from "client/features/modal/EventModal";
import Modal from "client/features/modal/Modal";
import useDate from "client/hooks/useDate";

const Index: React.FC = () => {
  const auth = useAuthContext();
  const date = useDate();
  const formModal = useFormModalContext();
  const modal = useModalContext();

  return (
    <>
      <main className="flex flex-col gap-3 p-3 shadow-sm min-h-screen max-w-[1920px] mx-auto">
        <CalendarHeader date={date} />
        <Calendar date={date} />
      </main>
      {auth?.user && (
        <FormProvider>
          <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
            <Modal context={modal}>
              <EventModal />
            </Modal>
            {auth?.user && 
            <Modal context={formModal}>
              <UserForm />
            </Modal>
            }
          </div>
        </FormProvider>
      )}
    </>
  );
}

export default Index;
