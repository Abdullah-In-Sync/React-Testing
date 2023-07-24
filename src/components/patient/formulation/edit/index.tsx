import { useRouter } from "next/router";
import React from "react";
import { TemplateFormData } from "../../../templateTable/table.model";
import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import { templateComponents } from "../../resource/edit/patientTemplateData";
import { useAppContext } from "../../../../contexts/AuthContext";
import TemplateArrow from "../../../templateArrow";

interface ViewProps {
  formulationData: any;
  onSubmit?: (v) => void;
  onClickView?: () => void;
  mode?: string;
  onPressBack?: () => void;
  arrowTemplatedefaultIsPreview?: boolean;
  defaultUserType?: string;
  onCancel?: () => void;
}

const PatientFormulationTemplateEdit: React.FC<ViewProps> = ({
  formulationData,
  onSubmit,
  onClickView,
  mode,
  onPressBack,
  arrowTemplatedefaultIsPreview,
  defaultUserType,
  onCancel,
}) => {
  const { user: { user_type: userType = "patient" } = {} } = useAppContext();
  const router = useRouter();
  const onClickViewProps = { ...(mode === "edit" && { onClickView }) };

  const TemplateDynamic = templateComponents[formulationData?.component_name];
  // const TemplateDynamic = templateComponents["TemplateTable"];
  const templateData =
    formulationData.template_response &&
    formulationData.template_response !== ""
      ? formulationData.template_response
      : formulationData.templateData;
  const staticTemplate: TemplateFormData =
    templateData && JSON.parse(templateData);
  const handleBackButton = (): any => {
    const fromUrl = router?.query?.from as string;
    return mode !== "edit" && onClickView
      ? onClickView()
      : fromUrl
      ? router.push(fromUrl)
      : router.back();
  };

  return (
    <>
      <BreadCrumbsWithBackButton
        heading={formulationData?.formulation_name || ""}
        activeBoxBorder={true}
        backButtonClick={onPressBack ? onPressBack : handleBackButton}
        {...onClickViewProps}
        mode={
          formulationData?.component_name == "ArrowTemplate" ? "arrowView" : ""
        }
        view={"patientFormulation"}
      >
        {staticTemplate &&
          TemplateDynamic &&
          formulationData?.component_name == "TemplateTable" && (
            <TemplateDynamic
              mode={mode}
              initialData={staticTemplate}
              onSubmit={onSubmit}
              userType={userType}
              onCancel={onCancel}
              view={"patientFormulation"}
            />
          )}
        {formulationData?.component_name == "ArrowTemplate" && (
          <TemplateArrow
            mode={"patientView"}
            nodesData={JSON.parse(templateData).nodes}
            edgesData={JSON.parse(templateData).edges}
            onSubmit={onSubmit}
            onCancel={onCancel}
            userType={defaultUserType ? defaultUserType : userType}
            defaultIsPreview={arrowTemplatedefaultIsPreview}
          />
        )}
      </BreadCrumbsWithBackButton>
    </>
  );
};

export default PatientFormulationTemplateEdit;
