import { Box } from "@material-ui/core";
import React from "react";
import { AdminViewAssessment } from "../../../../graphql/assessment/types";
import { Accordion } from "../../../common/Accordion";
import { MesageTextDisplay } from "../../../common/MessageTextDisplay/MessageTextDisplay";
import AddUpdateCategoryQuestion from "../addUpdateCategoryQuestion/AddUpdateCategoryQuestion";
import ActionsButtons from "./ActionsButtons";
import { ViewAssessmentProps } from "./ViewAssessment";

const ViewAssessmentList: React.FC<ViewAssessmentProps> = ({
  data,
  actionButtonClick,
  assessmentLoading,
  onAssessmentCategoryQuestionSubmit,
  handleToggleContent,
  confirmRef,
  handleDeleteQuestion,
}) => {
  const { category = [] } = data as AdminViewAssessment;

  const accordion = ({ title, item, i }) => {
    const { assessmentQuestionsViewData } = item;
    return (
      <Accordion
        detail={
          <AddUpdateCategoryQuestion
            onAssessmentCategoryQuestionSubmit={
              onAssessmentCategoryQuestionSubmit
            }
            categoryData={item}
            assessmentQuestionsViewData={assessmentQuestionsViewData}
            confirmRef={confirmRef}
            handleDeleteQuestion={handleDeleteQuestion}
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
    if (category.length <= 0 && !assessmentLoading)
      return <MesageTextDisplay message="No data found." />;

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
