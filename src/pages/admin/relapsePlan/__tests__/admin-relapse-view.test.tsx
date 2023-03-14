import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useRouter } from "next/router";

import RelapseView from "../../../../pages/admin/relapsePlan/view/[id]";

import { VIEW_RELAPSE_BY_PLAN_ID } from "../../../../graphql/Relapse/graphql";
import theme from "../../../../styles/theme/theme";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: VIEW_RELAPSE_BY_PLAN_ID,
    variables: {
      planId: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
    },
  },
  result: {
    data: {
      adminViewRelapseById: {
        _id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
        created_date: "2023-03-01T11:48:30.945Z",
        description: "updated desc",
        name: "updated plan",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        organization_name: "portal.dev-myhelp",
        plan_type: "fixed",
        status: 1,
        updated_date: "2023-03-10T11:42:53.377Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        questions: [
          {
            _id: "cf0c92b1-98da-4c72-8774-dc8974397ad3",
            created_date: "2023-03-01T11:48:31.005Z",
            plan_id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
            relapse_additional_details: "new updated desc",
            relapse_ques: "i am updated question",
            relapse_ques_status: 1,
            relapse_ques_type: "text",
            relapse_ques_typeoption: "",
            updated_date: "2023-03-07T09:54:34.029Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "RelapsePlanQuestions",
          },
          {
            _id: "67d51dc8-6c8f-45d0-9a13-335d142a26b3",
            created_date: "2023-03-01T11:48:31.030Z",
            plan_id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
            relapse_additional_details: "description 2",
            relapse_ques: "How are you daddy",
            relapse_ques_status: 1,
            relapse_ques_type: "list",
            relapse_ques_typeoption: "Test-list1,test-list2",
            updated_date: "2023-03-01T11:48:31.030Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "RelapsePlanQuestions",
          },
        ],
        __typename: "adminViewRelapse",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <RelapseView />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin relapse view", () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
    },
    back: pushMock,
  });
  it("should render admin relapse view data", async () => {
    await sut();
    const test2Text = await screen.findByText(/test-list2/i);
    expect(test2Text).toBeInTheDocument();
  });
  it("should back button click", async () => {
    await sut();
    const backButton = await screen.findByTestId("backButton");
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalled();
  });
});
