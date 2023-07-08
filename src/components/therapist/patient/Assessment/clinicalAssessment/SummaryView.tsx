import { useRouter } from "next/router";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Box, Button, Typography } from "@mui/material";
import { useStyles } from "./style";
import ContentHeader from "../../../../common/ContentHeader";

type propTypes = {
  therapistAssessmentSummaryViewData?: any;
};

export default function SummaryView(props: propTypes) {
  /* istanbul ignore next */
  const styles = useStyles();
  const router = useRouter();

  /* istanbul ignore next */
  const summaryData =
    props?.therapistAssessmentSummaryViewData?.assessmentSummaryView;

  return (
    <Box>
      <ContentHeader title="Assessment" />

      <Box className={styles.backButton}>
        <Button
          className="nextButton"
          data-testid="backButton"
          variant="contained"
          onClick={() =>
            /* istanbul ignore next */
            router?.back()
          }
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Box>

      <Box
        data-testid={`summary_main_box`}
        className={styles.accordianDetailsQuestionBorder}
      >
        {
          /* istanbul ignore next */
          summaryData?.length > 0 ? (
            summaryData.map((data, index) => (
              <Box
                className={styles.accordianDetailsQuestionBorder}
                key={index}
              >
                <Typography
                  data-testid={`category_name`}
                  className={styles.catogoryName}
                >
                  {data.category_name}
                </Typography>

                <Box className={styles.accordianDetailsQuestionBox}>
                  <Typography
                    className={styles.accordianDetailsQuestionBoxTypography}
                  >
                    {data.question}
                  </Typography>
                </Box>
                <Box className={styles.accordianDetailsQuestionBox}>
                  <Typography
                    className={styles.accordianDetailsQuestionBoxTypography}
                  >
                    {data.answer}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No data found</Typography>
          )
        }
      </Box>
    </Box>
  );
}
