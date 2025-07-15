import type { PropsWithChildren } from "react";
import Modal from "react-modal";

type Props = {
  showModal: boolean;
};

const StyledModal = ({ showModal, children }: PropsWithChildren<Props>) => {
  return (
    <Modal isOpen={showModal} style={customStyles}>
      {children}
    </Modal>
  );
};

export default StyledModal;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
