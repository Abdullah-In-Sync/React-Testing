import { Box, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import {
  QuestionsEntity,
  ViewSafetyPlanById,
} from "../../../graphql/SafetyPlan/types";
import { SafetyPlanAnswer } from "./safetyPlanAnswer";
import { useStyles } from "./safetyPlanStyle";

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
  return (
    <Box marginTop={"24px"}>
      <Typography className={classis.headingText}>
        {index + 1}. {question?.safety_ques}
      </Typography>
      {question?.safety_additional_details && (
        <Typography marginTop={"10px"} className={classis.descriptionText}>
          {question?.safety_additional_details}
        </Typography>
      )}
      <Box marginTop={"10px"}>
        <SafetyPlanAnswer
          question={question}
          index={index}
          formikHelper={formikHelper}
        />
      </Box>
    </Box>
  );
};
