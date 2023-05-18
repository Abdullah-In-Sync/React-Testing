import React from "react";
import { AdminViewMonitorById } from "../../../../graphql/Monitor/types";
import { ModalRefs } from "../form/types";
import ViewForm from "../form/ViewForm";

interface ViewProps {
  data?: AdminViewMonitorById;
  handleBackClick?: () => void;
}

const ViewMonitor: React.FC<ViewProps & ModalRefs> = ({
  data,
  handleBackClick,
}) => {
  if (!data) return null;

  const {
    name,
    org_id: orgId,
    organization_name: organizationName,
    questions = [],
  } = data;
  const modifyQuestions = questions.map((item) => ({
    questionId: item._id,
    question: item.question,
    questionType: item.question_type,
    questionOption:
      item.question_type == "emoji"
        ? JSON.parse(item.question_option)
        : item.question_option,
  }));

  const initialValues = {
    name,
    orgId,
    questions: modifyQuestions,
    organizationName,
  };

  return <ViewForm values={initialValues} handleBackClick={handleBackClick} />;
};

export default ViewMonitor;
