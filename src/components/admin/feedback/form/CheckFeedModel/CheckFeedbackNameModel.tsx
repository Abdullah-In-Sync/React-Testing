import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { CheckFeedbackNameRes } from "../../../../../graphql/Feedback/types";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import TableGenerator from "../../../../common/TableGenerator";
import { useStyles } from "./CheckFeedbackNameModelStyle";

interface ViewProps {
  validationFailList: CheckFeedbackNameRes;
  isOpen: boolean;
  onOK?: () => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "864px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  "&:focus-visible": {
    outline: "unset",
  },
};

const CheckFeedbackModel: React.FC<ViewProps> = ({
  onOK,
  isOpen,
  validationFailList,
}) => {
  const classes = useStyles();

  const fields = [
    {
      key: "organization_name",
      columnName: "Organization",
      visible: true,
      render: (val) => val,
    },
    {
      key: "User",
      columnName: "User",
      visible: true,
      render: () => "Client",
    },
    {
      key: "session_no",
      columnName: "Session",
      visible: true,
      render: (val) => val,
    },
  ];

  return (
    <Modal open={isOpen} data-testid="checkFeedbackModel">
      <Box sx={style}>
        <Box display={"flex"} alignItems={"center"} gap={"14px"}>
          <Image
            alt="validation_error"
            src="/images/error_round.png"
            width="45"
            height="45"
            style={{ borderRadius: "50%" }}
          />
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            Following Sessions are already exists! Kindly uncheck existed to
            proceed
          </Typography>
        </Box>
        <Box
          style={{ marginTop: "20px" }}
          className={classes.adminFeedbackValidationTable}
        >
          <TableGenerator
            fields={fields}
            data={validationFailList?.checkFeedbackName}
            pagination={false}
            loader={false}
            dataCount={10}
            selectedRecords={[]}
            showPagination={false}
          />
        </Box>
        <Box marginTop="20px" display="flex" justifyContent="center">
          {onOK && (
            <Button
              variant="contained"
              sx={{ marginLeft: "5px" }}
              size="small"
              data-testid="confirmButton"
              onClick={onOK}
            >
              Ok
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
export default CheckFeedbackModel;
