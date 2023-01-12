import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeProvider } from "@mui/material";
import { SUBMIT_PATIENT_MONITOR_BY_ID } from "../graphql/mutation/patient";
import {
  GET_PATIENT_MONITORING_LIST,
  GET_PATIENT_MONITOR_ANS_BY_ID,
  GET_PATIENT_MONITOR_BY_ID,
} from "../graphql/query/patient";

import Monitoring from "../pages/patient/monitoring";
import dummyData from "../components/patient/monitoring/data";
import theme from "../styles/theme/theme";

import { SnackbarProvider } from "notistack";
import moment from "moment";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_MONITORING_LIST,
  },
  result: {
    data: {
      getPatientMonitorList: [
        {
          _id: "e5dcf99163fb48438947a7e64bbf56ea",
          ca_cat_id: "",
          ca_subcat_id: "",
          monitor_cat_id: "0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_frequency: "1",
          ptmon_name: "Dummt Moniter",
          ptmon_status: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoring",
          index: 0,
        },
        {
          _id: "e5dcf99163fb48438947a7e64bbf56eanext",
          ca_cat_id: "",
          ca_subcat_id: "",
          monitor_cat_id: "0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_frequency: "1",
          ptmon_name: "Next test",
          ptmon_status: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoring",
          index: 1,
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENT_MONITOR_BY_ID,
    variables: {
      monitorId: "e5dcf99163fb48438947a7e64bbf56ea",
    },
  },
  result: {
    data: {
      getPatientMonitorById: [
        {
          _id: "5ad3cbef50894ba6bedb66cd2a7a48b6",
          created_date: "2023-01-02T08:02:56.000Z",
          emoji_ids:
            '[{"_id":"61e596189a57eb27735c4791","emoji_url":"Terrible.png","emoji_caption":"Terribles"},{"_id":"61e5964e9a57eb27735c4792","emoji_url":"not_so_good.png","emoji_caption":"Not so goods"},{"_id":"61e596649a57eb27735c4793","emoji_url":"Okay.png","emoji_caption":"Okay"},{"_id":"61e596789a57eb27735c4794","emoji_url":"Good.png","emoji_caption":"Good"},{"_id":"61e596949a57eb27735c4795","emoji_url":"Fantastic.png","emoji_caption":"Fantastic"}]',
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_ans: null,
          ptmon_id: "e5dcf99163fb48438947a7e64bbf56ea",
          ptmonques_listtype: "",
          ptmonques_question: "Test",
          ptmonques_scalecaption: "",
          ptmonques_scalepoint: "",
          ptmonques_status: 1,
          ptmonques_type: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoringQues",
        },
        {
          _id: "f4f152b3841f46049c1758860806086c",
          created_date: "2023-01-02T08:02:56.000Z",
          emoji_ids: null,
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_ans: null,
          ptmon_id: "e5dcf99163fb48438947a7e64bbf56ea",
          ptmonques_listtype: "",
          ptmonques_question: "sfsdfdsfsfsdf sdf sdf sd f sdf sd f dsf",
          ptmonques_scalecaption: "",
          ptmonques_scalepoint: "",
          ptmonques_status: 1,
          ptmonques_type: 3,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoringQues",
        },
        {
          _id: "7faf8bb656ce48e0bd66ed766310ba69",
          created_date: "2023-01-02T08:02:56.000Z",
          emoji_ids: null,
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_ans: null,
          ptmon_id: "e5dcf99163fb48438947a7e64bbf56ea",
          ptmonques_listtype: "",
          ptmonques_question: "sdfdsf sdf sdf sdfs",
          ptmonques_scalecaption: "",
          ptmonques_scalepoint: "",
          ptmonques_status: 1,
          ptmonques_type: 4,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoringQues",
        },
        {
          _id: "f10be2c4e37549d0a99e795fcef4bbe1",
          created_date: "2023-01-02T08:02:56.000Z",
          emoji_ids: null,
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_ans: null,
          ptmon_id: "e5dcf99163fb48438947a7e64bbf56ea",
          ptmonques_listtype: "dfssfsdfdsf,sdfds,fdsf,sdfsd,fdsf,sdf,sdfs",
          ptmonques_question: "zxccsdsfsfsfdsf",
          ptmonques_scalecaption: "",
          ptmonques_scalepoint: "",
          ptmonques_status: 1,
          ptmonques_type: 6,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoringQues",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENT_MONITOR_BY_ID,
    variables: {
      monitorId: "e5dcf99163fb48438947a7e64bbf56eanext",
    },
  },
  result: {
    data: {
      getPatientMonitorById: [
        {
          _id: "f4f152b3841f46049c1758860806086c",
          created_date: "2023-01-02T08:02:56.000Z",
          emoji_ids: null,
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_ans: null,
          ptmon_id: "e5dcf99163fb48438947a7e64bbf56eanext",
          ptmonques_listtype: "",
          ptmonques_question: "Test next",
          ptmonques_scalecaption: "",
          ptmonques_scalepoint: "",
          ptmonques_status: 1,
          ptmonques_type: 3,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoringQues",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: SUBMIT_PATIENT_MONITOR_BY_ID,
    variables: {
      monitorId: "e5dcf99163fb48438947a7e64bbf56ea",
      data: `[{"ptmonques_id":"5ad3cbef50894ba6bedb66cd2a7a48b6","ptmon_ans":"61e596189a57eb27735c4791"},{"ptmonques_id":"f4f152b3841f46049c1758860806086c","ptmon_ans":""},{"ptmonques_id":"7faf8bb656ce48e0bd66ed766310ba69","ptmon_ans":10},{"ptmonques_id":"f10be2c4e37549d0a99e795fcef4bbe1","ptmon_ans":"dfssfsdfdsf"}]`,
    },
  },
  result: {
    data: {
      submitMonitorByPatient: [
        {
          _id: "4d60fee15c564f59a6052d0668f50ec9",
          created_date: "2023-01-02T08:03:25.000Z",
          emoji_ids: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptmon_ans: "1",
          ptmon_id: "e5dcf99163fb48438947a7e64bbf56ea",
          ptmonques_id: "f4f152b3841f46049c1758860806086c",
          ptmonques_listtype: "",
          ptmonques_question: "sfsdfdsfsfsdf sdf sdf sd f sdf sd f dsf",
          ptmonques_scalecaption: "",
          ptmonques_scalepoint: "",
          ptmonques_status: 1,
          ptmonques_type: 3,
          ptmonqueslog_by: "686802e5123a482681a680a673ef7f53",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          __typename: "PatientMonitoringQuesLog",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENT_MONITOR_ANS_BY_ID,
    variables: {
      monitorId: "e5dcf99163fb48438947a7e64bbf56ea",
      endDate: moment().format("YYYY-MM-DD"),
      startDate: "2022-03-02",
      dateSort: "asc",
    },
  },
  result: {
    data: {
      getPatientMonitorAnsById: dummyData.ansResponseData,
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Monitoring />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const clickBox = async () => {
  await sut();
  const completeButtonFirst = await screen.findByTestId(
    "monitoringCompleteReponse_0"
  );
  await fireEvent.click(completeButtonFirst);
  emojiClick();
  listCsvClick();
};

const saveClickFlow = async () => {
  await clickBox();
  hoursInputChange(10);
  const saveButton = await screen.findByRole("button", { name: "Save" });
  fireEvent.click(saveButton);
};

const saveClickFlowFail = async () => {
  await clickBox();
  hoursInputChange("15");
  const saveButton = await screen.findByRole("button", { name: "Save" });
  fireEvent.click(saveButton);
};

const hoursInputChange = async (value) => {
  const hourInput = await screen.findByTestId("hoursInput");
  expect(hourInput).toBeInTheDocument();
  fireEvent.change(hourInput, { target: { value } });
};

const emojiClick = async () => {
  const emojiButton = await screen.findByTestId("61e596189a57eb27735c4791");
  fireEvent.click(emojiButton);
  expect(emojiButton).toHaveClass("active");
};
const listCsvClick = async () => {
  const csvButton = await screen.findByTestId("csvElement_0");
  fireEvent.click(csvButton);
  expect(csvButton).toHaveClass("active");
};

describe("Patient monitoring page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
    (useRouter as jest.Mock).mockImplementation(() => ({
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    }));
  });

  it("should render monitoring list screen", async () => {
    await sut();
    expect(await screen.findByText(/Dummt Moniter/i)).toBeInTheDocument();
  });

  it("should render monitoring complete screen", async () => {
    await saveClickFlow();
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    fireEvent.click(okButton);
    expect(okButton).not.toBeInTheDocument();
    const backButton = await screen.findByRole("button", { name: "Back" });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    const monitoringToolsText = await screen.findByText(/Monitoring Tools/i);
    expect(monitoringToolsText).toBeInTheDocument();
  });

  it("should hide confirmation popup on press of cancel button", async () => {
    await saveClickFlow();
    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("should monitor data on press of next button", async () => {
    await saveClickFlow();
    const nextButton = await screen.findByRole("button", { name: "Next" });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(await screen.findByText(/Test next/i)).toBeInTheDocument();
  });

  it("Should display the error if submit api fail", async () => {
    await saveClickFlowFail();
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Server error please try later./i)
    ).toBeInTheDocument();
  });

  it("should render monitoring view response screen", async () => {
    // const mockClick = jest.fn();

    await sut();
    const viewButtonFirst = await screen.findByTestId(
      "monitoringViewReponse_0"
    );
    fireEvent.click(viewButtonFirst);

    expect(await screen.findByTestId("completedON_24")).toBeInTheDocument();

    // const goButton = await screen.findByTestId("goButton");
    // expect(goButton).toBeInTheDocument();
    // fireEvent.click(goButton);
  });
});
