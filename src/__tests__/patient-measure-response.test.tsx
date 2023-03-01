import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";

import MeasureResponse from "../pages/patient/measures/score/response/[response_id]";
import { VIEW_MEASURE_RESPONSE } from "../graphql/Measure/graphql";
import { useRouter } from "next/router";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: VIEW_MEASURE_RESPONSE,
  },
  result: {
    data: {
      viewMeasureResponse: [
        {
          created_date: "2023-01-04T07:45:47.252Z",
          measure_cat_id: "1f48d0c3b8834d5a85836367bc6cb0b5",
          patient_id: "6605f4c3992c4fa691a1317c69054ae8",
          patmscore_difficult: "3",
          patmscore_everyday_value: "0",
          patmscore_halfthedays_value: "0",
          patmscore_severaldays_value: "1",
          patmscore_notatall_value: "0",
          patmscore_status: 1,
          patmscore_value: "1",
          patientmeasurequestion: {
            measure_cat_ques_id: "e4b7b8ddde4748cfa3bed3af68dcca2a",
            patmques_everyday: 0,
            measure_cat_id: "1f48d0c3b8834d5a85836367bc6cb0b5",
            patmques_ques: "how are you ?",
            patmques_halfthedays: 0,
            patmques_notatall: 0,
            patmques_severaldays: 1,
            __typename: "PatientMeasureQuestion",
          },
          _id: "6829471c-a33b-4bb7-a30a-e43564eaa840",
          __typename: "PatMeasureScore",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <MeasureResponse />
      </SnackbarProvider>
    </MockedProvider>
  );

  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

describe("Measures score list", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
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
    jest.useFakeTimers().setSystemTime(new Date("2022-12-23"));
  });

  test("Renders measure score list & chart", async () => {
    await sut();
    expect(screen.queryByTestId("notatall-1")).toBeInTheDocument();
    expect(screen.queryByTestId("submitTest")).not.toBeInTheDocument();
  });
});
