import React, { forwardRef, useImperativeHandle, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { SuccessModal } from "../../../components/common/SuccessModal";

type Props = React.PropsWithChildren<OpenConfirmPram>;

const ConfirmWrapper = forwardRef(({ children }: Props, ref): JSX.Element => {
  const [successModal, setSuccessModal] = useState<any>();
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });

  useImperativeHandle(ref, () => ({
    openConfirm({ confirmFunction, description, setSubmitting }) {
      setIsConfirm({
        ...isConfirm,
        ...{
          setSubmitting,
          status: true,
          confirmObject: {
            description,
          },
          storedFunction: (callback) => confirmFunction(callback),
        },
      });
    },
    showSuccess({ handleOk, description }) {
      setSuccessModal({
        description,
        handleOk,
      });
    },
  }));

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      clearIsConfirm();
    });
  };
  const clearIsConfirm = () => {
    if (isConfirm.setSubmitting instanceof Function)
      isConfirm.setSubmitting(false);

    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  const handleOk = () => {
    if (successModal.handleOk instanceof Function) successModal.handleOk();

    setSuccessModal(undefined);
  };

  return (
    <>
      {children}
      {isConfirm.status && (
        <ConfirmationModal
          label={isConfirm.confirmObject.description}
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={Boolean(successModal)}
          title="Successful"
          description={successModal.description}
          onOk={handleOk}
        />
      )}
    </>
  );
});

export default ConfirmWrapper;

type OpenConfirmPram = {
  confirmFunction?: (value: () => void) => void;
  description?: string;
  setSubmitting?: any;
};

type OpenSuccessParam = {
  handleOk?: () => void;
  description?: string;
};

export type ConfirmElement = {
  openConfirm: ({ confirmFunction, description }: OpenConfirmPram) => void;
  showSuccess: ({ handleOk, description }: OpenSuccessParam) => void;
};
