import React from "react";
import { CommonModal } from "../CustomModal/CommonModal";
import TemplateFormatsImages from "./TemplateFormatImagesBox";
import { useStyles } from "./templateFormatStyles";

interface ViewProps {
  modalRefFormatsView?: any;
}

const ViewFormatsModal: React.FC<ViewProps> = ({
  modalRefFormatsView,
}) => {
  const styles = useStyles();
  return (
    <CommonModal
      ref={modalRefFormatsView}
      maxWidth="md"
      className={styles.modalC}
    >
      <TemplateFormatsImages handleOk={modalRefFormatsView.current?.close} />
    </CommonModal>
  );
};

export default ViewFormatsModal;
