import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";
import { TherapistListMeasuresEntity } from "../../../../graphql/Measure/types";
import { Accordion } from "../../../common/Accordion";
import CommonButton from "../../../common/Buttons/CommonButton";
import ActionsButtons from "./ActionsButtons";

type ViewProps = {
  listData: TherapistListMeasuresEntity[];
  actionButtonClick: (value) => void;
};

const MeasuresList: React.FC<ViewProps> = ({
  listData = [],
  actionButtonClick,
}) => {
  const accordionDetail = () => {
    return (
      <Box className="accordionDetailWrapper">
        <Box className="detailFirst">
          <Typography variant="h6">Current Score: 0</Typography>
        </Box>
        <Box className="detailSecond">
          <CommonButton variant="contained" className="scoreButton">
            View Scores
          </CommonButton>
          <CommonButton variant="contained" className="scoreButton">
            Take Test
          </CommonButton>
        </Box>
      </Box>
    );
  };

  const accordion = ({ title, item, i }) => {
    return (
      <Accordion
        title={title}
        detail={accordionDetail}
        index={i}
        actionButtons={
          <ActionsButtons data={item} buttonClick={actionButtonClick} />
        }
      />
    );
  };

  const infoBox = (message) => {
    return (
      <Box className="infoMessageBoxWrapper">
        <Typography>{message}</Typography>
      </Box>
    );
  };

  const accordionList = () => {
    return (listData as Array<TherapistListMeasuresEntity>).map((item, i) => {
      const { title } = item;
      return <Box key={`measure_${i}`}>{accordion({ title, item, i })}</Box>;
    });
  };

  if (listData.length <= 0) return infoBox("No data found.");

  return <Stack className="measuresListWrapper">{accordionList()}</Stack>;
};

export default MeasuresList;
