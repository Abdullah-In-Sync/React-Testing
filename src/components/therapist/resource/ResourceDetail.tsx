import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

import BreadCrumbsWithBackButton from "../../common/BreadCrumbsWithBackButton";

import * as PaitentTemplateInterface from "./types";

import { useStyles } from "./resourcestyles";

interface ViewProps {
  resourceData?: PaitentTemplateInterface.ResourceData;
  templateResponse?: string;
  onSubmit?: (v) => void;
  onClickView?: () => void;
  mode?: string;
  onPressBack?: () => void;
  handleNextButton?: () => void;
}

const PaitentTemplateEdit: React.FC<ViewProps> = ({
  resourceData,
  onPressBack,
  handleNextButton,
}) => {
  const styles = useStyles();

  const {
    resource_url = "#",
    download_resource_url = "#",
    resource_desc,
    resource_instruction,
    resource_references,
    resource_name = "",
    template_data,
  } = resourceData;
  const nexButtonClick = template_data && { nexButtonClick: handleNextButton };

  const inputViewBox = ({ title, description }: any) => {
    return (
      <Stack className="descriptionBoxWrapper">
        <label>{title}</label>
        <Box>
          <Typography>{description}</Typography>
        </Box>
      </Stack>
    );
  };

  return (
    <>
      <BreadCrumbsWithBackButton
        heading={resource_name}
        breadCrumbsLabels={["Diorder Name", "Model Name", resource_name]}
        backButtonClick={onPressBack}
        {...nexButtonClick}
      >
        {Object.keys(resourceData).length > 0 && (
          <Stack className={styles.resouceDetailBoxWrapper}>
            {!template_data && (
              <Stack data-testid="iconsTarget" className="buttonIconWrapper">
                <IconButton
                  size="medium"
                  data-testid="viewUrl"
                  target="_blank"
                  href={resource_url}
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  size="medium"
                  data-testid="downloadUrl"
                  href={download_resource_url}
                >
                  <FileDownloadIcon />
                </IconButton>
              </Stack>
            )}
            <Stack className="inputsWrapper">
              {inputViewBox({
                title: "Description",
                description: resource_desc,
              })}
              {inputViewBox({
                title: "Instructions",
                description: resource_instruction,
              })}
              {inputViewBox({
                title: "References",
                description: resource_references,
              })}
            </Stack>
          </Stack>
        )}
      </BreadCrumbsWithBackButton>
    </>
  );
};

export default PaitentTemplateEdit;
