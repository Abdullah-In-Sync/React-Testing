import * as React from "react";
import { useRef } from "react";
import {
  CommonModal,
  ModalElement,
} from "../../common/CustomModal/CommonModal";
import ConfirmBox from "./ConfirmBox";
import Course from "./Course";
import { useStyles } from "./courseStyles";

interface ViewProps {
  handleUseFulInfo?: () => void;
  handleContinueButtonClick?: () => void;
  handleOk?: () => void;
  isAgreed?: boolean;
}

const PatientHomeWorkComponent: React.FC<ViewProps> = ({
  handleUseFulInfo,
  handleContinueButtonClick,
  handleOk,
  isAgreed,
}) => {
  const modalRef = useRef<ModalElement>(null);
  const styles = useStyles();
  /* istanbul ignore next */
  const handleCheckContinueButtonClick = () => {
    if (isAgreed) handleContinueButtonClick();
    else modalRef.current?.open();
  };
  return (
    <>
      <Course
        handleUseFulInfo={handleUseFulInfo}
        handleContinueButtonClick={handleCheckContinueButtonClick}
      />
      <CommonModal
        ref={modalRef}
        headerTitleText={""}
        maxWidth="xs"
        className={styles.modalC}
      >
        <ConfirmBox handleOk={handleOk} />
      </CommonModal>
    </>
  );
};

export default PatientHomeWorkComponent;
