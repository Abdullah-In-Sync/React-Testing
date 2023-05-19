import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import {
  ADMIN_DELETE_MONITOR_QUESTION,
  ADMIN_VIEW_MONITOR,
} from "../../../../graphql/Monitor/graphql";

import { useRouter } from "next/router";
import ViewMonitorPage from "../../../../pages/admin/monitor/view/[id]";

import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

const mocksData = [];

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
              '[{"code":"1f621","text":"Very Sad"},{"code":"1f63f","text":"Sad"},{"code":"1f479","text":"Fine"},{"code":"1f47a","text":"Happy"},{"code":"1f63e","text":"Very Happy"}]',
            question_type: "emoji",
            status: 1,
            updated_date: "2023-05-18T12:03:29.572Z",
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
            updated_date: "2023-05-18T12:03:29.599Z",
            __typename: "AdminMonitorQuestion",
          },
          {
            _id: "32589d04-c9c9-4c6d-bb03-853775bc2d92",
            created_date: "2023-05-18T11:15:45.895Z",
            monitor_id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
            question: "test 3",
            question_option: "option1,option2",
            question_type: "list",
            status: 1,
            updated_date: "2023-05-18T12:03:29.604Z",
            __typename: "AdminMonitorQuestion",
          },
          {
            _id: "4c1071db-b574-4bf0-b7e2-440ebc0c14b3",
            created_date: "2023-05-18T11:15:45.889Z",
            monitor_id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
            question: "test2 quest",
            question_option: "",
            question_type: "yes_or_no",
            status: 1,
            updated_date: "2023-05-18T12:03:29.609Z",
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
    query: ADMIN_DELETE_MONITOR_QUESTION,
    variables: {
      questionId: "f1969129-3032-469e-8ce5-f0658437683f",
    },
  },
  result: {
    data: {
      adminDeleteMonitorQs: {
        _id: "768be1cb-8635-4c22-8643-4aa6b83f2989",
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
          <ViewMonitorPage />
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

describe("Admin view monitor", () => {
  it("should render admin view monitor", async () => {
    await sut();
    expect(await screen.findByText(/test2 quest/i)).toBeInTheDocument();
  });
});
