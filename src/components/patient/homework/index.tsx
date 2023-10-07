import * as React from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import HomeworkAccordions from "./HomeworkAccordions";
import { useStyles } from "./homeworkStyles";
import * as homeworkListTypes from "./types";

const PatientHomeWorkComponent: React.FC<
  homeworkListTypes.HomeworkListProps
> = ({ homeworkList, handleSubmit }) => {
  const styles = useStyles();
  return (
    <div>
      <div className={styles.headerWrapper}>
        <ContentHeader title="Homework" />
      </div>
      <HomeworkAccordions
        homeworkList={homeworkList}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PatientHomeWorkComponent;
