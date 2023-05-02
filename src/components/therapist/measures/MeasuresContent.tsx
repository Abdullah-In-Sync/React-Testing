import { Box, Typography } from "@mui/material";
import * as React from "react";
import MeasuresList from "./list/MeasuresList";
import { useStyles } from "./measuresStyles";

import { TherapistListMeasuresEntity } from "../../../graphql/Measure/types";
import CommonButton from "../../common/Buttons/CommonButton";
import TakeTest from "./TakeTest/TakeTest";
import { CommonFormProps, ModalRefs } from "./form/types";
import ViewScore from "./list/ViewScore";
import ViewResponse from "./ViewResponse/ViewResponse";

type ViewProps = {
  listData: TherapistListMeasuresEntity[];
  onClickCreateMeasure: () => void;
  actionButtonClick: (value) => void;
  onPressAddPlan?: () => void;
  accordionViewData: { data: TherapistListMeasuresEntity; type: string };
  onPressCancel?: (value) => void;
  accodionViewScore: any;
  onPressCancelBack?: any;
  onViewResponseClick?: (v) => void;
  viewResponseBackClick?: () => void;
} & ModalRefs &
  CommonFormProps;

const MeasuresContent: React.FC<ViewProps> = ({
  listData,
  onClickCreateMeasure,
  actionButtonClick,
  onPressAddPlan,
  accordionViewData,
  onPressCancel,
  submitForm,
  confirmRef,
  accodionViewScore,
  onPressCancelBack,
  onViewResponseClick,
  viewResponseBackClick,
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
    if (accordionViewData) {
      const { data, type } = accordionViewData;
      switch (type) {
        case "takeTest":
          return (
            <TakeTest
              measureData={data}
              onPressCancel={onPressCancel}
              submitForm={submitForm}
              confirmRef={confirmRef}
            />
          );
        case "viewResponse":
          return (
            <ViewResponse
              backButtonClick={viewResponseBackClick}
              measureData={data}
            />
          );
        default:
          return null;
      }
    } else if (accodionViewScore)
      return (
        <ViewScore
          therapistViewScoreData={accodionViewScore}
          onPressCancelBack={onPressCancelBack}
          onViewResponseClick={onViewResponseClick}
        />
      );
    else
      return (
        <MeasuresList
          listData={listData}
          actionButtonClick={actionButtonClick}
        />
      );
  };

  return (
    <Box className={styles.measuresWrapper}>
      {topHeader()}
      {accordionView()}
    </Box>
  );
};

export default MeasuresContent;
