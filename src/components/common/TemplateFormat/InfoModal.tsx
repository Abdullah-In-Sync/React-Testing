{
  /* <InfoModal modalRef={infoModalRef} /> */
}
import React from "react";
import { CommonModal } from "../CustomModal/CommonModal";

type ViewProps = React.PropsWithChildren<{
  modalRef?: any;
}>;

const InfoModal: React.FC<ViewProps> = ({ modalRef, children }) => {
  return (
    <CommonModal ref={modalRef} maxWidth="md">
      {children}
    </CommonModal>
  );
};

export default InfoModal;
