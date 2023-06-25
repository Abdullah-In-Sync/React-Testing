import { Box } from "@material-ui/core";
import React from "react";
import { Accordion } from "../../../../common/Accordion";
import { MesageTextDisplay } from "../../../../common/MessageTextDisplay/MessageTextDisplay";
import ActionsButtons from "./ActionsButtons";
import { ClinicalAssessmentProps } from "./ClinicalAssessment";

const ClinicalAssessmentList: React.FC<ClinicalAssessmentProps> = ({
  actionButtonClick,
  handleToggleContent = null,
  categoryListData,
  therapistViewAssessmentLoading,
}) => {
  const accordion = ({ title, item, i }) => {
    const { assessmentQuestionsViewData } = item;
    return (
      <Accordion
        handleToggleContent={(callback) =>
          handleToggleContent(callback, item, i)
        }
        title={title}
        index={i}
        defaultIsOpen={Boolean(assessmentQuestionsViewData)}
        actionButtons={
          <ActionsButtons data={item} buttonClick={actionButtonClick} />
        }
      />
    );
  };

  const accordionList = () => {
    if (categoryListData.length <= 0 && !therapistViewAssessmentLoading)
      return <MesageTextDisplay message="No data Found." />;

    return categoryListData.map((item, i) => {
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

export default ClinicalAssessmentList;
