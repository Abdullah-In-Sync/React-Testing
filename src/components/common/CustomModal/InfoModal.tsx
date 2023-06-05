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

type ViewProps = React.PropsWithChildren<{
  maxWidth?: any;
  className?: string;
}>;

const InfoModal = forwardRef<ConfirmInfoElement, ViewProps>(
  (props, ref): JSX.Element => {
    const styles = useStyles();
    const {
      children,
      maxWidth = "sm",
      className = styles.modalC,
      ...rest
    } = props;
    const [data, setData] = useState();
    const modalRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      openConfirm({ data }) {
        setData(data);
        modalRef.current.open();
      },
      close() {
        setData(undefined);
        modalRef.current.close();
      },
    }));

    const elementWithProps = () => {
      return cloneElement(children as ReactElement<any>, {
        data,
        modalRef,
      });
    };

    return (
      <CommonModal ref={modalRef} {...{ maxWidth, className }} {...rest}>
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
  close: () => void;
};
