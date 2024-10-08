import { Box } from "@material-ui/core";
import React from "react";
import { Accordion } from "../../../../common/Accordion";
import { MesageTextDisplay } from "../../../../common/MessageTextDisplay/MessageTextDisplay";
import ActionsButtons from "./ActionsButtons";
import { ClinicalAssessmentProps } from "./ClinicalAssessment";
import UpdateQuestionResponse from "./updateQuestionResponse/UpdateQuestionResponse";
import { checkPrivilageAccess } from "../../../../../utility/helper";

const ClinicalAssessmentList: React.FC<ClinicalAssessmentProps> = ({
  actionButtonClick,
  handleToggleContent = null,
  categoryListData = {},
  confirmRef,
  therapistViewAssessmentLoading,
  handleDeleteQuestion,
  onSubmitAssessmentResponse,
}) => {
  const { category: categories = [] } = categoryListData;
  const isAssessmentEdit = checkPrivilageAccess("Assessment", "Edit");
  const accordion = ({ title, item, i }) => {
    const { assessmentQuestionsViewData } = item;
    return (
      <Accordion
        detail={
          <UpdateQuestionResponse
            onSubmitAssessmentResponse={onSubmitAssessmentResponse}
            categoryData={item}
            assessmentQuestionsViewData={assessmentQuestionsViewData}
            confirmRef={confirmRef}
            handleDeleteQuestion={handleDeleteQuestion}
            isAssessmentEdit={isAssessmentEdit}
          />
        }
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
    /* istanbul ignore next */
    if (categories.length <= 0 && !therapistViewAssessmentLoading)
      return <MesageTextDisplay message="No data found." />;

    return categories.map((item, i) => {
      const { name } = item;
      return (
        <Box key={`measure_${i}`}>
          {accordion({
            title: name,
            item,
            i,
          })}
        </Box>
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
