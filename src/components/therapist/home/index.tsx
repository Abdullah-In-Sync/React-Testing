import React from "react";
import therapistHomeData, { TherapistHomeDataTypes } from "./therapistHomeData";
import { Box, Stack } from "@mui/material";
import { useStyles } from "./therapistHomeStyles";
import { Typography } from "@material-ui/core";
import TherapistHomeCard from "./TherapistHomeCard";

const TherapistHomeComponent: React.FC = () => {
  const styles = useStyles();
  const { title, intro, contactEmailLabel, contactEmail, detail } =
    therapistHomeData as TherapistHomeDataTypes;

  return (
    <>
      <Stack className={styles.therapistHomeScreen}>
        <Box className="row1">
          <label>
            <Typography>{contactEmailLabel}</Typography>
          </label>{" "}
          &nbsp;:&nbsp;{" "}
          <Typography className="contactEmail">{contactEmail}</Typography>
        </Box>
        <Box className="row2">
          <Box className="header">
            <Typography variant="subtitle1">{title}</Typography>
          </Box>
          <Box className="intro">
            <Typography>{intro}</Typography>
          </Box>
        </Box>
        <Box className="row3">
          <TherapistHomeCard detail={detail} />
        </Box>
      </Stack>
    </>
  );
};

export default TherapistHomeComponent;
