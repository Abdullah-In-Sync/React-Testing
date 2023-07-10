import { Box, Stack } from "@mui/material";
import { Typography } from "@material-ui/core";
import { forwardRef, useImperativeHandle, useState } from "react";
import { SelectTemplateModal } from "../../../common/CreateResource/selectTemplateModal";
import {
  TableDimensionFormData,
  TableDimensionModal,
} from "../../../common/CreateResource/tableDimensionModal";
import TemplateArrow from "../../../templateArrow";
import TemplateTable from "../../../templateTable";
import { TemplateFormData } from "../../../templateTable/table.model";
import { FormulationFormInitialData } from "../edit/EditFormulation";

interface ViewProps {
  values?: FormulationFormInitialData;
  setFieldValue?: any;
  submitForm?: () => void;
  handleCancel?: () => void;
}

const SelectTemplate = forwardRef(
  ({ values, setFieldValue, submitForm, handleCancel }: ViewProps, ref) => {
    const {
      name,
      templateData: { rows, nodes, edges },
      componentName,
    } = values;
    const [templateModal, setTemplateModal] = useState<boolean>(false);
    const [dimensionModal, setDimensionModal] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      openSelectTemplate: () => {
        setTemplateModal(true);
      },
    }));

    const onPreview = (values) => {
      sessionStorage.setItem("create", JSON.stringify({ data: values, name }));
      window.open("/v2/template/preview/create", "_blank");
    };

    const template = () => {
      if (componentName === "TemplateTable") {
        return (
          <TemplateTable
            initialData={{ rows }}
            mode="edit"
            onSubmit={(v) => {
              setFieldValue("templateData", v);
              submitForm();
            }}
            onCancel={handleCancel}
            onPreview={onPreview}
          />
        );
      } else if (componentName === "ArrowTemplate") {
        return (
          <TemplateArrow
            nodesData={nodes}
            edgesData={edges}
            onSubmit={(v) => {
              setFieldValue("templateData", JSON.parse(v));

              submitForm();
            }}
            onCancel={handleCancel}
            userType="fullAccess"
          />
        );
      }
    };

    const getTemplateName = () => {
      if (componentName === "TemplateTable") return "Table Template";
      else if (componentName === "ArrowTemplate") return "Flow Template";
    };

    const onTemplateSelect = (values: any) => {
      const { component_name } = values;
      if (component_name !== "ArrowTemplate") {
        setTemplateModal(false);
        setDimensionModal(true);
      } else {
        setFieldValue("componentName", "ArrowTemplate");
        setFieldValue("templateData", { nodes, edges });
        setTemplateModal(false);
      }

      return;
    };

    const onGenerateTable = (values: TableDimensionFormData) => {
      const initialData: TemplateFormData = { rows: [] };
      for (let j = 0; j < values.rows; j++) {
        initialData.rows.push({
          height: "200px",
          cells: Array.from({ length: values.cols }, () => ({
            type: "",
            width: "600px",
          })),
        });
      }
      setFieldValue("templateData", initialData);
      setDimensionModal(false);
      setFieldValue("componentName", "TemplateTable");
    };

    return (
      <Stack>
        <Box className="templateHeading">
          <Typography variant="subtitle1">{getTemplateName()}</Typography>
        </Box>
        {template()}
        {templateModal && (
          <SelectTemplateModal
            isOpen={templateModal}
            setConfirmSubmission={null}
            onSubmit={onTemplateSelect}
            onModalClose={setTemplateModal}
          />
        )}
        {dimensionModal && (
          <TableDimensionModal
            isOpen={dimensionModal}
            setConfirmSubmission={null}
            onSubmit={(values) => onGenerateTable(values)}
            onModalClose={setDimensionModal}
          />
        )}
      </Stack>
    );
  }
);

export default SelectTemplate;

export type SelectTemplateType = {
  openSelectTemplate: () => void;
};
