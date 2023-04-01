import React from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { CommonModal } from "../CustomModal/CommonModal";
import TemplateFormatsImages from "./TemplateFormatImagesBox"
import {useStyles} from "./templateFormatStyles"

export interface InitialFormValues {
  planId: string;
}

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
        <TemplateFormatsImages handleOk={modalRefFormatsView.current?.close}/>
    </CommonModal>
  );
};

export default ViewFormatsModal;
