import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import moment from "moment";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import TherapyPatientMonitorList from "..";
import { useAppContext } from "../../../../../contexts/AuthContext";
import {
  GET_THERAPIST_PATIENT_MONITOR_LIST,
  THERAPIST_VIEW_MONITOR,
} from "../../../../../graphql/Monitor/graphql";
import theme from "../../../../../styles/theme/theme";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../../../../../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_THERAPIST_PATIENT_MONITOR_LIST,
    variables: {
      patient_id: "patient-id",
    },
  },
  result: {
    data: {
      therapistMonitorList: {
        data: [
          {
            _id: "list-item-1",
            name: "Check 2",
          },
          {
            _id: "list-item-2",
            name: "Chech 1",
          },
          {
            _id: "list-item-3",
            name: "Check 3",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_VIEW_MONITOR,
    variables: {
      patientId: "patient-id",
      monitorId: "list-item-1",
      startDate: "2022-03-02",
      endDate: "2023-05-30",
    },
  },
  result: {
    data: {
      therapistViewMonitor: {
        data: {
          _id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
          added_by: "therapist",
          created_date: "2023-05-29T08:11:42.615Z",
          name: "Test1",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          share_status: 1,
          status: 1,
          therapist_id: null,
          questions: [
            {
              updated_date: "2023-05-29T08:11:42.624Z",
              status: 1,
              question_type: "emoji",
              question_option:
                '[{"code":"1f97a","text":"Very Sad"},{"code":"1f641","text":"Sad"},{"code":"1f642","text":"Fine"},{"code":"1f60a","text":"Happy"},{"code":"1f639","text":"Very Happy"}]',
              question: "monitor first",
              monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
              created_date: "2023-05-29T08:11:42.624Z",
              answers_list: [
                {
                  _id: "fea32277-3051-40c3-a168-09190c82ac84",
                  answer: "Very Happy",
                  created_date: "2023-05-29T08:14:20.446Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "c70a102c-b691-4770-bf09-695677380911",
                  answer: "Happy",
                  created_date: "2023-05-29T09:20:26.103Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "fa602358-eb22-4662-927c-96d49fa92d12",
                  answer: "Happy",
                  created_date: "2023-05-29T09:20:58.725Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "7086fe76-4e86-4dd7-a87e-e38d6647cfdc",
                  answer: "Happy",
                  created_date: "2023-05-29T09:21:05.511Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "c12334f2-77bc-4cec-b863-3925a5338e8c",
                  answer: "Fine",
                  created_date: "2023-05-29T10:31:04.223Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "4efb65de-77a7-4a2b-b5c1-ae096e55d6e9",
                  answer: "Sad",
                  created_date: "2023-05-29T10:42:59.193Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "c3c713a3-07af-4146-9d97-30038c84627d",
                  answer: "Fine",
                  created_date: "2023-05-30T04:28:09.025Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "356f2d10-07e9-4e71-8fa1-114661fc5ce5",
                  answer: "Sad",
                  created_date: "2023-05-30T04:29:19.929Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "84d382ad-c7ac-462b-8736-49a14c41dff7",
                  answer: "Very Happy",
                  created_date: "2023-05-30T04:31:42.920Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "6ba9d9ac-a1c1-444b-9f72-83c408aa0a93",
                  answer: "Very Happy",
                  created_date: "2023-05-30T04:32:04.303Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "d50d6024-eebb-4b72-84fb-ae7fba5710fa",
                  answer: "Very Happy",
                  created_date: "2023-05-30T04:32:12.706Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "8695f8b5-bc25-435a-95d1-44b813b33204",
                  answer: "Happy",
                  created_date: "2023-05-30T09:17:42.859Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "864d395d-8cc1-4d47-85bd-53d838e34180",
                  answer: "Very Sad",
                  created_date: "2023-05-30T09:18:29.267Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
                  __typename: "PatientMonitorAnswers",
                },
              ],
              answer: "Very Sad",
              _id: "ac888df7-8ff1-46e9-a9a0-4d78231c9f73",
              __typename: "PatientMonitorQuestion",
            },
            {
              question_type: "hours",
              question_option: '""',
              question: "hours type",
              monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
              created_date: "2023-05-29T08:11:42.636Z",
              answers_list: [
                {
                  _id: "9a6b06b6-ce22-4c47-b359-915ab1d56faf",
                  answer: "21",
                  created_date: "2023-05-29T08:14:20.497Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "ca2334f5-1a0e-4926-91a1-af1c378f4d89",
                },
              ],
              answer: "3",
              _id: "ca2334f5-1a0e-4926-91a1-af1c378f4d89",
              __typename: "PatientMonitorQuestion",
            },
            {
              question_type: "list",
              question_option: '"option1,option2,option3"',
              question: "list type",
              monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
              created_date: "2023-05-29T08:11:42.641Z",
              answers_list: [
                {
                  _id: "dc4ba592-78f6-44b8-930a-1bf774dec529",
                  answer: "option2",
                  created_date: "2023-05-29T08:14:20.510Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "84f08a53-3395-45e9-ae3e-5fe3539710dd",
                },
              ],
              answer: '"option1',
              _id: "84f08a53-3395-45e9-ae3e-5fe3539710dd",
            },
            {
              question_type: "yes_or_no",
              question_option: '""',
              question: "yes not type",
              monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
              created_date: "2023-05-29T08:11:42.631Z",
              answers_list: [
                {
                  _id: "7e9b18ac-6a35-4c61-9b03-9d0ebc839321",
                  answer: "yes",
                  created_date: "2023-05-29T08:14:20.523Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "13b4639f-922d-48ef-aa0d-604949b6200b",
                  __typename: "PatientMonitorAnswers",
                },
                {
                  _id: "724acd2b-68c8-4ec5-9e48-1b45ce655aee",
                  answer: "no",
                  created_date: "2023-05-29T09:20:26.133Z",
                  monitor_id: "2d74b48d-f0a6-48db-8bc3-cbd665bde6bb",
                  question_id: "13b4639f-922d-48ef-aa0d-604949b6200b",
                  __typename: "PatientMonitorAnswers",
                },
              ],
              answer: "yes",
              _id: "13b4639f-922d-48ef-aa0d-604949b6200b",
            },
          ],
          __typename: "patientViewMonitor",
        },
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapyPatientMonitorList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useAppContext as jest.Mock).mockReturnValue({
    isAuthenticated: true,
    user: {
      _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
      user_type: "therapist",
      parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
      perm_ids: "9,10,14,21,191,65,66",
      user_status: "1",
      created_date: "2021-12-20 16:20:55",
      updated_date: "2021-12-20 16:20:55",
      therapist_data: {
        _id: "therapist_id",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
      },
    },
  });
});

describe("Therapist monitor view response", () => {
  it("should render thearapist patient monitor list and click view response button", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        tab: "monitor",
        id: "patient-id",
        subTab1: "patient-monitor",
      },
      push: pushMock,
    });
    await sut();
    expect(await screen.findAllByText(/Check 2/i)).toHaveLength(1);
    const viewResponseButton = await screen.findByTestId(
      "viewResponseButton_0"
    );
    fireEvent.click(viewResponseButton);
    expect(pushMock).toHaveBeenCalledWith(
      `patient-id/?mainTab=therapy&tab=monitor&subTab1=patient-monitor&view=viewResponse&monitorId=list-item-1&startDate=2022-03-02&endDate=${moment().format(
        "YYYY-MM-DD"
      )}`
    );
  });

  it("should render view response, filter go button and back button", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "patient-id",
        tab: "monitor",
        subTab1: "patient-monitor",
        monitorId: "list-item-1",
        view: "viewResponse",
        startDate: "2022-03-02",
        endDate: "2023-05-30",
      },
      push: pushMock,
    });
    await sut();
    expect(await screen.findByText(/list type/i)).toBeInTheDocument();
    const filterGoButton = await screen.findByTestId("goButton");
    fireEvent.click(filterGoButton);
    expect(pushMock).toHaveBeenCalledWith(
      "patient-id/?mainTab=therapy&tab=monitor&subTab1=patient-monitor&view=viewResponse&monitorId=list-item-1&startDate=2022-03-02&endDate=2023-05-30"
    );
    const backButton = await screen.findByTestId("backButton");
    fireEvent.click(backButton);
    expect(pushMock).toBeCalled();
  });
});
