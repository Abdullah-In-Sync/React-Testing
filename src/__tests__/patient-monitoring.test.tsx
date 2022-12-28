import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import { ThemeProvider } from "@mui/material";
import { GET_PATIENT_MONITORING_LIST } from "../graphql/query/patient";

import Monitoring from "../pages/patient/monitoring";
import theme from "../styles/theme/theme";

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_MONITORING_LIST,
  },
  result: {
    data: {
      getPatientMonitorList: [
        {
          _id: "a4ba8d089bd6481fb1997f8a1d23a1e0",
          ca_cat_id: "",
          ca_subcat_id: "",
          created_date: "2022-04-21T03:23:28.000Z",
          last_completed_date: null,
          monitor_cat_id: "0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_frequency: "1",
          ptmon_name: "Trial-21-04-22 Anshita",
          ptmon_status: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoring",
        },
        {
          _id: "fd310c68378b4ccaa9652c39de46eaf9",
          ca_cat_id: "",
          ca_subcat_id: "",
          created_date: "2022-10-28T17:01:23.000Z",
          last_completed_date: "2022-10-28T17:02:24.000Z",
          monitor_cat_id: "0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_frequency: "1",
          ptmon_name: "TEST AGENDA",
          ptmon_status: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoring",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme}>
        <Monitoring />
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Patient monitoring page", () => {
  it("should render monitoring list screen", async () => {
    await sut();
    expect(
      await screen.findByText(/Trial-21-04-22 Anshita/i)
    ).toBeInTheDocument();
  });
});
