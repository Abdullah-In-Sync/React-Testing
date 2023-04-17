import { Box, Button, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { FC, useState } from "react";
import {
  QuestionsEntity,
  ViewSafetyPlanById,
} from "../../../graphql/SafetyPlan/types";
import { SafetyPlanAnswer } from "./safetyPlanAnswer";
import { useStyles } from "./safetyPlanStyle";
import RelapseInfoModal from "../Relapse/infoModle";
import InfoIcon from "@mui/icons-material/Info";

type Props = {
  question: QuestionsEntity;
  index: number;
  formikHelper: FormikProps<ViewSafetyPlanById>;
};

export const SafetyPlanQuestion: FC<Props> = ({
  question,
  index,
  formikHelper,
}) => {
  const classis = useStyles();
  const [isInfoModle, setIsInfoModle] = useState<boolean>(false);

  return (
    <Box marginTop={"24px"}>
      <Typography className={classis.headingText}>
        {index + 1}. {question?.safety_ques}
        {question?.safety_additional_details && (
          <InfoIcon
            data-testid={`button-edit-icon_${question?.safety_additional_details}`}
            style={{ fontSize: "20px", marginRight: "10px" }}
            onClick={() => setIsInfoModle(true)}
          />
        )}
      </Typography>

      <Box marginTop={"10px"}>
        <SafetyPlanAnswer
          question={question}
          index={index}
          formikHelper={formikHelper}
        />
      </Box>

      <RelapseInfoModal
        modalOpen={isInfoModle}
        setModalOpen={setIsInfoModle}
        shouldCloseOnBackgroundClick={false}
        modalView={"appointment"}
      >
        <Box>
          <Box
            style={{
              paddingRight: "15px",
              color: "#6EC9DB",
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: "15px",
              fontSize: "20px",
            }}
            data-testid="safety_ques_info"
          >
            Question Information
          </Box>

          <Box
            sx={{
              border: "1px solid #cecece",
              display: "grid",
              padding: "10px",
            }}
            borderRadius={"4px"}
          >
            <Typography> {question?.safety_ques}</Typography>
          </Box>
          <Box style={{ paddingTop: "20px" }}>
            <Box
              sx={{
                border: "1px solid #cecece",
                display: "grid",
                padding: "10px",
              }}
              borderRadius={"4px"}
            >
              <Typography style={{ paddingRight: "10px" }}>
                {" "}
                {question?.safety_additional_details}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
            }}
          >
            <Button
              data-testid="editTemplateCancelButton"
              variant="contained"
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                textTransform: "none",
              }}
              onClick={() => setIsInfoModle(false)}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </RelapseInfoModal>
    </Box>
  );
};
