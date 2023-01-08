import Modal from './Modal'

function RejectionModal(props) {
    return (
      <Modal context={props.context} onClose={props.onClose}>
        <h1>New Modal</h1>
        <p>This is the content of the new modal</p>
      </Modal>
    );
  }

  export default RejectionModal;