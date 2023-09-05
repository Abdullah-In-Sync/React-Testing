import { Stack } from "@mui/material";
import Box from "@mui/material/Box";

import Layout from "../../layout";

import TabsGeneratorTherapist from "../../common/TabsGenerator/TabsGeneratorTherapistPatient";

import { useStyles } from "./therapiesStyles";
import DisorderPage from "../therapiesPages/disorder";
import TherapiesListPage from "../therapiesPages/therapy";
import CategoryPage from "../therapiesPages/category";
import ModalListPage from "../therapiesPages/modal";

const TherapyAdminComponent = () => {
  const styles = useStyles();

  /* istanbul ignore next */
  const tabs2 = [
    {
      label: "Therapy",
      value: "therapy",
      component: <TherapiesListPage />,
    },
    {
      label: "Disorder",
      value: "disorder",
      component: <DisorderPage />,
    },
    {
      label: "Model",
      value: "model",
      component: <ModalListPage />,
    },
    {
      label: "Category",
      value: "category",
      component: <CategoryPage />,
    }
  ];

  return (
    <>
      <Layout>
        <Stack className={styles.therapyMain}>
          <Box className="secondSection" data-testid="patientViewMenu">
            <TabsGeneratorTherapist tabsList={tabs2} />
          </Box>
        </Stack>
      </Layout>
    </>
  )
};

export default TherapyAdminComponent;
