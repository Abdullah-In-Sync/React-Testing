import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";
import {
  TherapistListMeasuresEntity
} from "../../../../graphql/Measure/types";
import { Accordion } from "../../../common/Accordion";
import CommonButton from "../../../common/Buttons/CommonButton";
import ActionsButtons from "./ActionsButtons"

type ViewProps = {
  listData: TherapistListMeasuresEntity[];
  actionButtonClick: (value) => void
}

const MeasuresList: React.FC<ViewProps> = ({
  listData = [],
  actionButtonClick
}) => {

  const accordionDetail = () => {
    return (
      <Box className="accordionDetailWrapper">
        <Box className="detailFirst">
          <Typography variant="h6">Current Score: 0</Typography>
        </Box>
        <Box className="detailSecond">
          <CommonButton
            variant="contained"
            className="scoreButton"
          >
            View Scores
          </CommonButton>

          <CommonButton
            variant="contained"
            className="scoreButton"
          >
            Take Test
          </CommonButton>
        </Box>
      </Box>
    )
  }

  const accordion = ({ title, item }) => {
    return (
      <Accordion
        title={title}
        detail={accordionDetail}
        actionButtons={<ActionsButtons data={item} buttonClick={actionButtonClick} />}

      />
    );
  };

  const accordionList = () => {
    return (listData as Array<TherapistListMeasuresEntity>).map((item, i) => {
      const { title } = item
      return <Box key={`measure_${i}`}>
        {accordion({ title, item })}
      </Box>
    })

  }

  return (
    <Stack className="measuresListWrapper">
      {accordionList()}
    </Stack>
  );
};

export default MeasuresList;
