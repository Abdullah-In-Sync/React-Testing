import { useRouter } from "next/router";
import React from "react";
import { TemplateFormData } from "../../../templateTable/table.model";
import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import { templateComponents } from "../../resource/edit/patientTemplateData";
import { useAppContext } from "../../../../contexts/AuthContext";
import TemplateArrow from "../../../templateArrow";
import { CustomImageComponent } from "../../../common/CustomImage";

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
  console.log(formulationData, "formulationData");
  const { user: { user_type: userType = "patient" } = {} } = useAppContext();
  const router = useRouter();
  const onClickViewProps = { ...(mode === "edit" && { onClickView }) };

  const TemplateDynamic = templateComponents[formulationData.component_name];
  const templateData =
    formulationData?.template_response &&
    formulationData?.template_response !== ""
      ? formulationData?.template_response
      : formulationData?.template_response;
  console.log(templateData, "templateData");
  const staticTemplate: TemplateFormData = templateData !== "" && templateData;
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
        backButtonClick={onPressBack ? onPressBack : handleBackButton}
        {...onClickViewProps}
        mode={
          formulationData?.component_name == "ArrowTemplate" ||
          formulationData?.component_name == ""
            ? "arrowView"
            : ""
        }
        view={"patientFormulation"}
        downloadUrl={
          formulationData?.component_name == ""
            ? formulationData?.download_formulation_url
            : undefined
        }
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
        {formulationData?.component_name == "" && (
          <CustomImageComponent url={formulationData?.formulation_url} />
        )}
      </BreadCrumbsWithBackButton>
    </>
  );
};

export default PatientFormulationTemplateEdit;
