import React, { forwardRef, useImperativeHandle, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

type Props = React.PropsWithChildren<OpenConfirmPram>;

const ConfirmWrapper = forwardRef(({ children }: Props, ref): JSX.Element => {
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
    openConfrim({ confirmFunction, description }) {
      setIsConfirm({
        ...isConfirm,
        ...{
          status: true,
          confirmObject: {
            description,
          },
          storedFunction: (callback) => confirmFunction(callback),
        },
      });
    },
  }));

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
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
    </>
  );
});

export default ConfirmWrapper;

type OpenConfirmPram = {
  confirmFunction?: (value: () => void) => void;
  description?: string;
};

export type ConfirmElement = {
  openConfrim: ({ confirmFunction, description }: OpenConfirmPram) => void;
};
