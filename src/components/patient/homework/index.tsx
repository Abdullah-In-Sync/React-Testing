import * as React from "react";
import ContentHeader from "../../../components/common/ContentHeader";
import HomeworkAccordions from "./HomeworkAccordions";
import { useStyles } from "./homeworkStyles";
import TherapySelectBox from "./TherapySelectBox";
import * as homeworkListTypes from "./types";

const PatientHomeWorkComponent: React.FC<
  homeworkListTypes.HomeworkListProps
> = ({
  homeworkList = [],
  therapyData = [],
  handleSubmit,
  onChangeTherapy,
}) => {
  const styles = useStyles();
  return (
    <div>
      <div className={styles.headerWrapper}>
        <ContentHeader title="Homework" />
        <TherapySelectBox
          therapyData={therapyData}
          onChangeTherapy={onChangeTherapy}
        />
      </div>
      <HomeworkAccordions
        homeworkList={homeworkList}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PatientHomeWorkComponent;
