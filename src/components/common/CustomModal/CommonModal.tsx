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
    const { onClose, children, ...other } = props;
    const [state, setState] = React.useState<State>({ open: false });
    const handleClose = useHandleClose(setState, onClose);

    React.useImperativeHandle(ref, () => ({
      open() {
        setState({ open: true });
      },
      close() {
        setState({ open: false });
      },
    }));

    return (
      <Dialog
        open={state.open}
        onClose={handleClose}
        className={styles.commonModalWrapper}
        {...other}
        fullWidth
      >
        <DialogTitle>
          {props.headerTitle}

          <Box>
            <IconButton
              aria-label="close"
              onClick={() => setState({ open: false })}
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
  headerTitle?: string;
};
