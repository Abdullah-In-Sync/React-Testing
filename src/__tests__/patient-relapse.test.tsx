import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import { UPDATE_RELAPSE_QUESTION_ANSWER_DATA } from "../graphql/mutation/patient";
import Relapse from "../pages/patient/relapse";
import { GET_PATIENT_RELAPSE_PLANS } from "../graphql/Relapse/graphql";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_RELAPSE_PLANS,
  },
  result: {
    data: {
      getPatientRelapsePlans: [
        {
          _id: "1beebad4-4e88-404a-ac8b-8797a300d250",
          name: "test name",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "58faebd8-921f-48eb-8b15-9715433a78aa",
          name: "abcd2",
          __typename: "patientRelapsePlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_RELAPSE_QUESTION_ANSWER_DATA,
    variables: {
      relapse_ans_data:
        '[{"relapse_ans_id":"b2a5e0cdc2a846f3bc97eea684a1bff9","relapse_ans":"avbv","relapse_ques_id":"3cf9e5e335674ebd855afff1067e7783"}]',
    },
  },
  result: {
    data: {
      updateRelapseAnswerByPatient: [
        {
          _id: "3cf9e5e335674ebd855afff1067e7783",
          created_date: "2022-12-27T06:55:25.000Z",
          order_by: 2,
          patient_id: "d8b2974bc1ce4540963851b118247a36",
          relapse_additional_details: "more details now",
          relapse_ans_detail: [
            {
              _id: "b2a5e0cdc2a846f3bc97eea684a1bff9",
              created_date: "2022-12-27T06:55:25.000Z",
              patient_id: "d8b2974bc1ce4540963851b118247a36",
              relapse_ans: "Give answer1",
              relapse_ans_status: 1,
              relapse_ques_id: "3cf9e5e335674ebd855afff1067e7783",
              therapist_id: "686802e5123a482681a680a673ef7f53",
              updated_date: "2022-12-27T07:05:43.853Z",
              __typename: "RelapseAns",
            },
          ],
          relapse_ques: "are you ok annie",
          relapse_ques_status: "1",
          updated_date: null,
          user_type: "admin",
          __typename: "MasterRelapseQuesPatient",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <Relapse />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Patient relapse page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "patient",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });

  test("Renders relapse data", async () => {
    await sut();
    await waitFor(async () => {
      const tiles = await screen.findAllByTestId("list-tile");
      expect(tiles.length).toEqual(2);
    });
  });
});
