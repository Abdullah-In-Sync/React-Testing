import { FC, useEffect } from "react";
import { useSnackbar } from "notistack";

export interface SuccessModalProps {
  isOpen: boolean;
  onOk: () => void;
  title?: string;
  description?: string;
  icon?: any;
}

export const SuccessModal: FC<SuccessModalProps> = ({ onOk, description }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar(description, {
      variant: "success",
    });
    onOk();
  }, []);

  return null;
};
