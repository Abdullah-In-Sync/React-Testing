import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStyles } from "../style";

type propTypes = {
  patientClinicalAssessmentList: any;
};

const PatientClinicalAssessmentList = (props: propTypes) => {
  const styles = useStyles();
  const assessmentCatogeryData = props.patientClinicalAssessmentList;
  const [expanded, setExpanded] = useState<number | boolean>(false);

  const handleToggle = (index: number) => {
    if (index === -1) {
      setExpanded(true);
    } else if (index === -2) {
      setExpanded(false);
    } else if (expanded === index) {
      setExpanded(false);
    } else {
      setExpanded(index);
    }
  };

  return (
    <>
      <Box>
        <Box className={styles.topButton}>
          <Box style={{ paddingRight: "10px" }}>
            <Button
              variant="outlined"
              onClick={() => handleToggle(-1)}
              data-testid="expand_button"
            >
              Expand all
            </Button>
          </Box>

          <Box>
            <Button
              variant="outlined"
              onClick={() => handleToggle(-2)}
              data-testid="collapse_button"
            >
              Collapse all
            </Button>
          </Box>
        </Box>

        {assessmentCatogeryData?.category?.map((data, index) => (
          <Box key={index} style={{ marginBottom: "10px" }}>
            <Accordion
              data-testid={`accordian_test_${index}`}
              expanded={expanded === true || expanded === index}
              className={styles.accordianTop}
            >
              <AccordionSummary
                expandIcon={
                  expanded === true || expanded === index ? (
                    <RemoveIcon className={styles.accordianIconButton} />
                  ) : (
                    <AddIcon className={styles.accordianIconButton} />
                  )
                }
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                onClick={() => handleToggle(index)}
              >
                <Typography className={styles.accordianName}>
                  {data.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.accordianDetails}>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PatientClinicalAssessmentList;
