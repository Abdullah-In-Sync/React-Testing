import { Box } from "@material-ui/core";
import React from "react";
import { AdminViewAssessment } from "../../../../graphql/assessment/types";
import { Accordion } from "../../../common/Accordion";
import { MesageTextDisplay } from "../../../common/MessageTextDisplay/MessageTextDisplay";
import ActionsButtons from "./ActionsButtons";
import { ViewAssessmentProps } from "./ViewAssessment";

const ViewAssessmentList: React.FC<ViewAssessmentProps> = ({
  data,
  actionButtonClick,
}) => {
  const { category = [] } = data as AdminViewAssessment;

  const accordion = ({ title, item, i }) => {
    return (
      <Accordion
        title={title}
        index={i}
        actionButtons={
          <ActionsButtons data={item} buttonClick={actionButtonClick} />
        }
      />
    );
  };

  const accordionList = () => {
    if (category.length <= 0)
      return <MesageTextDisplay message="No data Found." />;

    return category.map((item, i) => {
      const { name } = item;
      return (
        <Box key={`measure_${i}`}>{accordion({ title: name, item, i })}</Box>
      );
    });
  };
  return (
    <>
      <Box className="viewAssessmentListWrapper">{accordionList()}</Box>
    </>
  );
};

export default ViewAssessmentList;
