import { Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import CustomModal from "../CustomModal/customModel";

export interface SuccessModalProps {
  isOpen: boolean;
  onOk: () => void;
  title?: string;
  description?: string;
}

export const SuccessModal: FC<SuccessModalProps> = ({
  isOpen,
  onOk,
  title,
  description,
}) => {
  return (
    isOpen && (
      <CustomModal modalOpen={true}>
        <Grid container justifyContent={"center"} direction={"column"}>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom={"40px"}
            data-testid="SuccessModal"
          >
            <Image
              alt="My Help"
              src="/images/rightmark.png"
              height="67"
              width="67"
            />
          </Grid>
          {title && (
            <div>
              <Typography
                sx={{
                  color: "#000",
                  fontWeight: "600",
                  textAlign: "center",
                  paddingBottom: "5px",
                  font: "500",
                  fontSize: "16px",
                }}
                data-testid="title"
              >
                {title}
              </Typography>
            </div>
          )}
          {description && (
            <div>
              <Typography
                sx={{
                  color: "#000",
                  textAlign: "center",
                  fontWeight: "400",
                  paddingBottom: "20px",
                  fontSize: "16px",
                }}
                data-testid="description"
              >
                {description}
              </Typography>
            </div>
          )}
          <div style={{ textAlign: "center", paddingBottom: "10px" }}>
            <Button
              data-testid="SuccessOkBtn"
              variant="contained"
              style={{ width: 100 }}
              onClick={onOk}
            >
              Ok
            </Button>
          </div>
        </Grid>
      </CustomModal>
    )
  );
};
