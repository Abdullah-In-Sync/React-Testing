import { Box } from "@mui/material";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import TherapistGoal from "../../../../../../components/therapist/patient/therapistGoals";

type propTypes = {
  setTherapy: any;
};

export default function TherapyPatientGoalsIndex(props: propTypes) {
  const setTherapy = props.setTherapy;

  return (
    <>
      <Box style={{ paddingTop: "10px" }} data-testid="resource_name">
        <ContentHeader title="Goals" />
        <Box style={{ paddingTop: "10px" }}>
          <TherapistGoal setTherapy={setTherapy} />
        </Box>
      </Box>
    </>
  );
}
