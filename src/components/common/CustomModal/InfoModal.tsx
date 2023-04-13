import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  cloneElement,
  ReactElement,
} from "react";
import { CommonModal } from "../CustomModal/CommonModal";
import { useStyles } from "./commonModalStyles";

type ViewProps = React.PropsWithChildren;

const InfoModal = forwardRef<ConfirmInfoElement, ViewProps>(
  ({ children }, ref): JSX.Element => {
    const styles = useStyles();
    const [data, setData] = useState();
    const modalRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      openConfirm({ data }) {
        setData(data);
        modalRef.current.open();
      },
    }));

    const elementWithProps = () => {
      return cloneElement(children as ReactElement<any>, {
        data,
        modalRef,
      });
    };

    return (
      <CommonModal ref={modalRef} maxWidth="sm" className={styles.modalC}>
        {elementWithProps()}
      </CommonModal>
    );
  }
);

export default InfoModal;

type OpenConfirmPram = {
  data?: any;
};

export type ConfirmInfoElement = {
  openConfirm: ({ data }: OpenConfirmPram) => void;
};
