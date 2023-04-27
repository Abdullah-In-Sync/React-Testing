import { uniqueString } from "../../../../utility/helper";

export const allAnsColSum = (templateData) => {
  const {
    questions: { bodyRows, footerRows },
  } = templateData;
  const total = {
    col2: 0,
    col3: 0,
    col4: 0,
    col5: 0,
  };
  const overAllTotal = {
    colAvg: 0,
  };
  bodyRows.forEach((item) => {
    const { answer } = item;
    total[answer] += !isNaN(parseInt(item[answer]))
      ? parseInt(item[answer])
      : 0;
    overAllTotal["colAvg"] += !isNaN(parseInt(item[answer]))
      ? parseInt(item[answer])
      : 0;
  });
  return {
    tableFooter: [
      { ...footerRows[0], ...total },
      { ...footerRows[1], ...overAllTotal },
    ],
    totalScore: overAllTotal["colAvg"],
  };
};

export const onAddQuesionBox = ({
  templateData,
  setFieldValue,
  confirmModalRef,
}) => {
  if (templateData.questions.bodyRows.length < 15) {
    const questionsBodyRows = [...templateData.questions.bodyRows];
    questionsBodyRows.push({
      id: uniqueString(),
      col1: "",
      col2: "",
      col3: "",
      col4: "",
      col5: "",
      answer: "",
    });
    setFieldValue("templateData.questions.bodyRows", questionsBodyRows);
  } else {
    confirmModalRef.current?.open();
  }
};

export const placeholderCellText = (rowIndex, columnIndex, type) => {
  switch (type) {
    case "footerCell":
      if (rowIndex === 0 && columnIndex === 0) return "Column Total";
      else if (rowIndex === 1 && columnIndex === 0) return "Total Score";
      break;
    case "bodyCell":
      if (columnIndex === 0) return "Type your question here";
      break;
  }
};
