import { Breadcrumbs, Grid, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import styles from "./view.module.css";
import CardWithHeader from "../../../../../components/common/Cards/CardWithHeader";
import { TemplateFormData } from "../../../../../components/templateTable/table.model";
import * as ViewTemplateInterface from "./viewInterface";
const Components = ViewTemplateInterface.COMPONENTS;

interface ViewProps {
  currentTemplateData?: ViewTemplateInterface.ViewTemplateData;
}

const View: React.FC<ViewProps> = ({ currentTemplateData }) => {
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

  const TemplateDynamic = Components[currentTemplateData.component_name];

  return (
    <>
      <Grid
        xs={6}
        display="flex"
        flex-direction="row-reverse"
        sx={{
          color: "primary.main",
        }}
        style={{ justifyContent: "right" }}
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon
              fontSize="small"
              sx={{
                color: "primary.main",
              }}
            />
          }
          aria-label="breadcrumb"
          data-testid="breadCrumb"
        >
          <Typography color="primary.main">Table Template</Typography>,
          <Typography color="primary.main">Grid</Typography>,
          <Typography color="text.primary">
            {currentTemplateData.name}
          </Typography>
        </Breadcrumbs>
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
