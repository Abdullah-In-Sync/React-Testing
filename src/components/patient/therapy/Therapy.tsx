/* istanbul ignore file */
import { Box } from "@material-ui/core";
import TherapyTabsGenerator from "../../../components/common/TabsGenerator/TherapyTabGenerator";

export default function TherapyMainComponent({ tabs }) {
  return (
    <Box data-testid="patientViewTherapyTab" className="therapyTabsWrapper">
      <TherapyTabsGenerator
        tabsList={tabs}
        tabLabel={`/patient/therapy/?mainTab=therapy&tab=`}
      />
    </Box>
  );
}
