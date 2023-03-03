import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import * as React from "react";
import { useStyles } from "./commonModalStyles";

export const CommonModal = React.forwardRef<ModalElement, CommonModalProps>(
  (props, ref): JSX.Element => {
    const styles = useStyles();
    const { onClose, children, headerTitleText, className, ...other } = props;
    const [state, setState] = React.useState<State>({ open: false });
    const handleClose = useHandleClose(setState, onClose);

    React.useImperativeHandle(ref, () => ({
      open() {
        setState({ open: true });
      },
      close() {
        /* istanbul ignore next */
        closeModal();
      },
    }));

    /* istanbul ignore next */
    const closeModal = () => {
      setState({ open: false });
    };

    return (
      <Dialog
        open={state.open}
        onClose={handleClose}
        className={className ? className : styles.commonModalWrapper}
        {...other}
        fullWidth
      >
        <DialogTitle>
          {headerTitleText}
          <Box>
            <IconButton
              aria-label="close"
              data-testid="modalCrossIcon"
              onClick={closeModal}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  }
);

/* istanbul ignore next */
function useHandleClose(setState: SetState, handleClose?: CloseHandler) {
  return React.useCallback<CloseHandler>((event, reason) => {
    setState({ open: false });
    handleClose?.(event, reason ?? "backdropClick");
  }, []);
}

type State = { open: boolean; error?: Error };
type SetState = React.Dispatch<React.SetStateAction<State>>;
type CloseHandler = NonNullable<DialogProps["onClose"]>;

export type ModalElement = { open: () => void; close: () => void };

export type CommonModalProps = Omit<DialogProps, "open"> & {
  headerTitleText?: string;
  className?: string;
};
