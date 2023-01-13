import React from "react";
import ResourceList from "./ResourceList";
import * as patientResourceInterface from "./types";

interface ViewProps {
  patientResourceList?:
    | patientResourceInterface.GetPatResourceListEntity[]
    | null;
  buttonClick: (value) => void;
}

const PaitentTemplateEdit: React.FC<ViewProps> = ({
  patientResourceList,
  buttonClick,
}) => {
  return (
    <>
      <ResourceList
        patientResourceList={patientResourceList}
        buttonClick={buttonClick}
      />
    </>
  );
};

export default PaitentTemplateEdit;
