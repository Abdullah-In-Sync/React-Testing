import ArrowBackAlt from "@mui/icons-material/ArrowBack";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import CardWithHeader from "../../../../../components/common/Cards/CardWithHeader";
import { TemplateFormData } from "../../../../../components/templateTable/table.model";
import { CustomBreadcrumbs } from "../../../../common/Breadcrumbs";
import styles from "./view.module.css";
import * as ViewTemplateInterface from "./viewInterface";

interface ViewProps {
  currentTemplateData?: ViewTemplateInterface.ViewTemplateData;
}

const pathLabels: Array<string> = ["Table Template", "Grid"];

const View: React.FC<ViewProps> = ({ currentTemplateData }) => {
  if (!currentTemplateData) return null;
  const router = useRouter();
  const staticTemplate: TemplateFormData = {
    rows: [
      {
        cells: [
          {
            type: "header",
            title: "Activities",
          },
        ],
      },
    ],
  };

  const TemplateDynamic =
    ViewTemplateInterface.components[currentTemplateData.component_name];

  const handleBackClick = () => {
    /* istanbul ignore next */
    router.push("/admin/resource/template/list");
  };

  return (
    <>
      <Grid
        xs={6}
        display="flex"
        flex-direction="row-reverse"
        sx={{
          color: "primary.main",
        }}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          data-testid="backButton"
          variant="contained"
          onClick={handleBackClick}
          startIcon={<ArrowBackAlt />}
        >
          Back
        </Button>
        <CustomBreadcrumbs
          labels={[...pathLabels, ...[currentTemplateData.name]]}
        />
      </Grid>
      <CardWithHeader label={currentTemplateData.name}>
        <fieldset className={styles.disbledFieldSet} disabled>
          <TemplateDynamic mode="view" initialData={staticTemplate} />
        </fieldset>
      </CardWithHeader>
    </>
  );
};

export default View;
