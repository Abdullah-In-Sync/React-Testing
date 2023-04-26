import { Box, Typography } from "@mui/material";
import * as React from "react";
import MeasuresList from "./list/MeasuresList";
import { useStyles } from "./measuresStyles";

import { TherapistListMeasuresEntity } from "../../../graphql/Measure/types";
import CommonButton from "../../common/Buttons/CommonButton";
import TakeTest from "./TakeTest/TakeTest";
import { CommonFormProps, ModalRefs } from "./form/types";

type ViewProps = {
  listData: TherapistListMeasuresEntity[];
  onClickCreateMeasure: () => void;
  actionButtonClick: (value) => void;
  onPressAddPlan?: () => void;
  accordionViewData: TherapistListMeasuresEntity;
  onPressCancel?: (value) => void
} & ModalRefs & CommonFormProps;

const MeasuresContent: React.FC<ViewProps> = ({
  listData,
  onClickCreateMeasure,
  actionButtonClick,
  onPressAddPlan,
  accordionViewData,
  onPressCancel,
  submitForm,
  confirmRef
}) => {
  const styles = useStyles();

  const topHeader = () => {
    return (
      <Box className="topHeaderWrapper">
        <Box className="topHeaderFirstSection">
          <Typography variant="subtitle1">Measures</Typography>
        </Box>
        <Box className="topHeaderSecondSection">
          <CommonButton
            variant="contained"
            onClick={onClickCreateMeasure}
            data-testid="addQuestionButton"
          >
            Create Measure
          </CommonButton>
          <CommonButton
            variant="contained"
            onClick={onPressAddPlan}
            data-testid="addMeasureButton"
          >
            Add Measure
          </CommonButton>
        </Box>
      </Box>
    );
  };

  const accordionView = () => {
    if(accordionViewData)
      return <TakeTest measureData={accordionViewData} onPressCancel={onPressCancel} submitForm={submitForm} confirmRef={confirmRef}/>
    else
      return <MeasuresList listData={listData} actionButtonClick={actionButtonClick} />
  }

  return (
    <Box className={styles.measuresWrapper}>
      {topHeader()}
      {accordionView()}
    </Box>
  );
};

export default MeasuresContent;
