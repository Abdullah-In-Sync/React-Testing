import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/router";
import { VIEW_SAFETY_BY_PATIENT_ID } from "../graphql/SafetyPlan/graphql";
import SafetyPlanIndex from "../pages/admin/safetyPlan/view/[id]";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: VIEW_SAFETY_BY_PATIENT_ID,
    variables: {
      planId: "d3eccb14-abca-49cb-831c-cd6bee95f412",
    },
  },
  result: {
    data: {
      viewSafetyPlanById: {
        _id: "d3eccb14-abca-49cb-831c-cd6bee95f412",
        created_date: "2023-01-26T19:12:49.270Z",
        description: "a",
        name: "test",
        org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
        plan_type: "custom",
        status: 1,
        updated_date: "2023-01-27T04:21:55.062Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        questions: [
          {
            _id: "21bfa77e-c7b5-470c-a442-9dffcfe8a2a7",
            created_date: "2023-01-26T19:12:49.346Z",
            plan_id: "d3eccb14-abca-49cb-831c-cd6bee95f412",
            safety_ques: "asdf",
            safety_additional_details: "asdf",
            safety_ques_typeoption: "",
            safety_ques_type: "1",
            safety_ques_status: 1,
            updated_date: "2023-01-26T19:12:49.346Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "SafetyPlanQuestions",
          },
          {
            _id: "6b3c6ba7-9f15-4eff-b8e2-aa6e3d190800",
            created_date: "2023-01-27T04:19:31.860Z",
            plan_id: "d3eccb14-abca-49cb-831c-cd6bee95f412",
            safety_ques: "asdf",
            safety_additional_details: "asdf",
            safety_ques_typeoption: "asdf adf,a,new option",
            safety_ques_type: "2",
            safety_ques_status: 1,
            updated_date: "2023-01-27T04:19:31.859Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "SafetyPlanQuestions",
          },
          {
            _id: "b379f1b2-6ec7-4ddb-8701-805c68371aa5",
            created_date: "2023-01-27T04:21:55.088Z",
            plan_id: "d3eccb14-abca-49cb-831c-cd6bee95f412",
            safety_ques: "asdf",
            safety_additional_details: "asdf",
            safety_ques_typeoption: "asdf adf,a",
            safety_ques_type: "2",
            safety_ques_status: 1,
            updated_date: "2023-01-27T04:21:55.088Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "SafetyPlanQuestions",
          },
          {
            _id: "aa5312c1-8015-47c9-ae72-b151ea92fc3c",
            created_date: "2023-01-27T04:21:55.093Z",
            plan_id: "d3eccb14-abca-49cb-831c-cd6bee95f412",
            safety_ques: "asdf",
            safety_additional_details: "asdf",
            safety_ques_typeoption: "asdf adf,a,new option,new 1",
            safety_ques_type: "2",
            safety_ques_status: 1,
            updated_date: "2023-01-27T04:21:55.093Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "SafetyPlanQuestions",
          },
        ],
        __typename: "viewMasterSafetyPlan",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <SafetyPlanIndex />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Admin edit template page", () => {
  test("Renders goals data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "d3eccb14-abca-49cb-831c-cd6bee95f412",
      },
    }));

    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("agreement-form")).toBeInTheDocument();
      expect(screen.getByText("custom")).toBeInTheDocument();
    });
  });
});
