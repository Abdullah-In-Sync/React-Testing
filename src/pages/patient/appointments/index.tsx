import React from "react";
import type { NextPage } from "next";
import Layout from "../../../components/layout";
import { Box } from "@mui/material";
import TabsGenerator from "../../../components/common/TabsGenerator";
import withAuthentication from "../../../hoc/auth";
import ContentHeader from "../../../components/common/ContentHeader";
import BookedAppointment from "../../../components/common/PatientsAppointment/bookedAppointment";
import TherapistAvability from "../../../components/common/PatientsAppointment/therapistAvability";

const PatientById: NextPage = () => {
  const tabs = [
    {
      label: "Booked Appointment",
      value: "booked-appointment",
      component: <BookedAppointment />,
    },
    {
      label: "Therapist Availability",
      value: "therapist-availability",
      component: <TherapistAvability />,
    },
  ];

  return (
    <>
      <Layout>
        <ContentHeader title="Patients Appointments" />
        <Box
          style={{
            padding: "10px",
            border: "2px ",
            borderStyle: "solid",
            borderColor: "#6BA08E",
            borderRadius: "5px",
          }}
        >
          <TabsGenerator tabsList={tabs} activeTabs="booked-appointment" />
        </Box>
      </Layout>
    </>
  );
};
export default withAuthentication(PatientById, ["patient"]);
