import { Box } from "@mui/material";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import TherapyPatientHomework from "../../../../../../components/therapist/patient/TherapsitHomework";

type propTypes = {
  setTherapy: any;
};

export default function TherapyPatientHomeworkIndex(props: propTypes) {
  const setTherapy = props.setTherapy;

  return (
    <>
      <Box style={{ paddingTop: "10px" }} data-testid="resource_name">
        <ContentHeader title="Homework" />
        <Box style={{ paddingTop: "10px" }}>
          <TherapyPatientHomework setTherapy={setTherapy} />
        </Box>
      </Box>
    </>
  );
}
