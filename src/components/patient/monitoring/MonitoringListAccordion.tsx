import RemoveIcon from "@mui/icons-material/Remove";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import * as monitoringTypes from "./types";

import { useStyles } from "./monitoringStyles";

const MonitoringListAccordion: React.FC<monitoringTypes.MonitoringProps> = ({
  monitoringList = [],
}) => {
  const styles = useStyles();

  const toolsList = () => {
    return monitoringList.map((item, index) => {
      const { ptmon_name: title } = item;
      return (
        <Stack key={`monitoring_list_item_${index}`}>
          <Stack className={styles.listTitleWrapper}>
            <Typography>{title}</Typography>
          </Stack>
          <Stack className={styles.listButtonsWrapper}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={styles.toolsButton}
              data-testid={`monitoring_view_reponse_${index}`}
            >
              View Response
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={styles.toolsButton}
              data-testid={`monitoring_complete_reponse_${index}`}
            >
              Complete
            </Button>
          </Stack>
          <Stack pt={2} pb={2}>
            <Divider />
          </Stack>
        </Stack>
      );
    });
  };

  const commonAccordion = ({ label, emptyMessage }) => {
    return (
      <Stack mb={2}>
        <Accordion className={styles.accordion}>
          <AccordionSummary
            expandIcon={<RemoveIcon className={styles.accordionAddIcon} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className={styles.accordionSummary}
          >
            <Typography variant="h6">{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {toolsList()}
            {monitoringList.length <= 0 && (
              <Typography
                className={styles.emptyText}
                data-testid={"emptyMessage"}
              >
                {emptyMessage}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Stack>
    );
  };

  return (
    <Stack pb={2} pt={2}>
      {commonAccordion({
        label: "Monitoring Tools",
        emptyMessage: "No monitoring data found.",
      })}
    </Stack>
  );
};

export default MonitoringListAccordion;
