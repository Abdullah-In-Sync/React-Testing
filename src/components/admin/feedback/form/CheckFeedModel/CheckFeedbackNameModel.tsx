import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import TableGenerator from "../../../../common/TableGenerator";
import { useStyles } from "./CheckFeedbackNameModelStyle";

interface ViewProps {
  validationFailList: Array<any>;
  isOpen: boolean;
  onOK?: () => void;
  title: string;
  fields: Array<{
    key: string;
    columnName: string;
    visible: boolean;
    render: (val: any) => any;
  }>;
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
  fields,
  title,
}) => {
  const classes = useStyles();

  console.log(validationFailList, "validationFailList");

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
            {title}
          </Typography>
        </Box>
        <Box
          style={{ marginTop: "20px" }}
          className={classes.adminFeedbackValidationTable}
        >
          <TableGenerator
            fields={fields}
            data={validationFailList}
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
