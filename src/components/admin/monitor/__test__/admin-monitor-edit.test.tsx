import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import {
  ADMIN_UPDATE_MONITOR,
  ADMIN_VIEW_MONITOR,
} from "../../../../graphql/Monitor/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";

import { useRouter } from "next/router";
import EditMonitorPage from "../../../../pages/admin/monitor/edit/[id]";

import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "517fa21a82c0464a92aaae90ae0d5c59",
          contract:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
          created_date: "2022-12-05T09:47:11.000Z",
          logo: "",
          logo_url: null,
          name: "actions.dev-myhelp",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "Patients",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapy",
          __typename: "Organization",
        },
        {
          _id: "org2",
          contract:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
          created_date: "2022-12-05T09:47:11.000Z",
          logo: "",
          logo_url: null,
          name: "actions.dev-myhelp",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "Patients",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapy",
          __typename: "Organization",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_VIEW_MONITOR,
    variables: {
      monitorId: "8fc88c5b-836b-44c7-84fb-541be843ce89",
    },
  },
  result: {
    data: {
      adminViewMonitorById: {
        _id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
        name: "monitor4",
        created_date: "2023-05-16T08:55:54.238Z",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        organization_name: "portal.dev-myhelp",
        status: 1,
        updated_date: "2023-05-16T10:01:28.667Z",
        questions: [
          {
            _id: "768be1cb-8635-4c22-8643-4aa6b83f2989",
            created_date: "2023-05-16T08:55:54.481Z",
            monitor_id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
            question: "test1",
            question_option:
              '[{"code":"1f621","text":"Very Sad"},{"code":"1f62d","text":"Sad"},{"code":"1f63b","text":"Fine"},{"code":"1f47a","text":"Happy"},{"code":"1f63e","text":"Very Happy"}]',
            question_type: "emoji",
            status: 1,
            updated_date: "2023-05-16T10:01:28.696Z",
            __typename: "AdminMonitorQuestion",
          },
          {
            _id: "f1969129-3032-469e-8ce5-f0658437683f",
            created_date: "2023-05-16T08:55:54.486Z",
            monitor_id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
            question: "test1",
            question_option: "",
            question_type: "hours",
            status: 1,
            updated_date: "2023-05-16T10:01:28.704Z",
            __typename: "AdminMonitorQuestion",
          },
        ],
        __typename: "adminViewMonitor",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_MONITOR,
    variables: {
      monitorId: "8fc88c5b-836b-44c7-84fb-541be843ce89",
      questions:
        '[{"question":"test1","question_type":"emoji","question_id":"768be1cb-8635-4c22-8643-4aa6b83f2989","question_option":"[{\\"code\\":\\"1f621\\",\\"text\\":\\"Very Sad\\"},{\\"code\\":\\"1f62d\\",\\"text\\":\\"Sad\\"},{\\"code\\":\\"1f63b\\",\\"text\\":\\"Fine\\"},{\\"code\\":\\"1f47a\\",\\"text\\":\\"Happy\\"},{\\"code\\":\\"1f63e\\",\\"text\\":\\"Very Happy\\"}]"},{"question":"test1","question_type":"hours","question_id":"f1969129-3032-469e-8ce5-f0658437683f"}]',
      update: {
        name: "monitor4",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
      },
    },
  },
  result: {
    data: {
      adminUpdateMonitorById: {
        _id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
        status: 1,
        __typename: "adminViewMonitor",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <EditMonitorPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
    },
    push: pushMock,
  });
});

describe("Admin edit monitor", () => {
  it("should render admin update monitor page and submit the form", async () => {
    await sut();
    expect(await screen.findByText(/Very Happy/i)).toBeInTheDocument();
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
  });
});
