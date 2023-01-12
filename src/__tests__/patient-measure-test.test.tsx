import {
  screen,
  render,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";

import MeasureTestPage from "../pages/patient/measures/test/[id]";
import {
  GET_MEASURE_DETAIL_BY_PATIENT,
  UPDATE_MEASURE_SCORE_BY_PATIENT,
} from "../graphql/Measure/graphql";
import { useRouter } from "next/router";
// import React from "react";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_MEASURE_DETAIL_BY_PATIENT,
    variables: {
      measureCatId: "98392bff10104aa3a4aa3908141ec65a",
    },
  },
  result: {
    data: {
      getMeasureDetailByPatient: [
        {
          _id: "533de7a24f54432aaeac7210b1514fe9",
          measure_cat_id: "f7ebcd5b73874d2691bce97a70b6035f",
          measure_cat_ques: "Hello",
          measure_cat_ques_type: 1,
          __typename: "MeasureCatQues",
        },
        {
          _id: "dced493e82a448ad8ba96dbc07c1df08",
          measure_cat_id: "f7ebcd5b73874d2691bce97a70b6035f",
          measure_cat_ques: "TATA",
          measure_cat_ques_type: 1,
          __typename: "MeasureCatQues",
        },
        {
          _id: "ee5dfc6ada9c46fabf2ca61665185ace",
          measure_cat_id: "f7ebcd5b73874d2691bce97a70b6035f",
          measure_cat_ques: "BIRLA",
          measure_cat_ques_type: 1,
          __typename: "MeasureCatQues",
        },
        {
          _id: "4963f08025bb4f50b0e66cd9063286ee",
          measure_cat_id: "f7ebcd5b73874d2691bce97a70b6035f",
          measure_cat_ques: "VERY ",
          measure_cat_ques_type: 1,
          __typename: "MeasureCatQues",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_MEASURE_SCORE_BY_PATIENT,
    variables: {
      measureCatId: "98392bff10104aa3a4aa3908141ec65a",
      patmscore_difficult: 0,
      patmscore_value: 6,
      patmscore_notatall_value: 0,
      patmscore_severaldays_value: 1,
      patmscore_halfthedays_value: 2,
      patmscore_everyday_value: 3,
      qdata:
        '[{"measure_cat_ques_id":"533de7a24f54432aaeac7210b1514fe9","notatall":1,"severaldays":0,"halfthedays":0,"everyday":0},{"measure_cat_ques_id":"dced493e82a448ad8ba96dbc07c1df08","notatall":0,"severaldays":1,"halfthedays":0,"everyday":0},{"measure_cat_ques_id":"ee5dfc6ada9c46fabf2ca61665185ace","notatall":0,"severaldays":0,"halfthedays":1,"everyday":0},{"measure_cat_ques_id":"4963f08025bb4f50b0e66cd9063286ee","notatall":0,"severaldays":0,"halfthedays":0,"everyday":1}]',
    },
  },
  result: {
    data: {
      updateMeasureScoreByPatient: [
        {
          _id: "639fe699-b225-4ca4-bc6f-9a15d2041ab4",
          __typename: "PatientMeasureQuestion",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <MeasureTestPage />
      </SnackbarProvider>
    </MockedProvider>
  );

  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

describe("Measure Test", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {
        id: "98392bff10104aa3a4aa3908141ec65a",
      },
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
  });

  test("Renders measure test", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.queryByTestId("notatall-4")).toBeInTheDocument();
    });
  });

  test("If score is not selected then  show the error popup", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.queryByTestId("save-test-btn")).toBeInTheDocument();
    });
    await waitFor(() => fireEvent.click(screen.queryByTestId("save-test-btn")));
    expect(screen.queryByText("Please choose score")).toBeInTheDocument();
  });

  test("select the score the submit the score", async () => {
    await sut();
    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("notatall-1"));
    });
    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("severaldays-2"));
    });
    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("halfthedays-3"));
    });
    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("everyday-4"));
    });

    const totalScore = screen.queryByTestId("total-score")?.textContent;

    expect(totalScore).toEqual("6");

    await waitFor(() => fireEvent.click(screen.queryByTestId("save-test-btn")));

    expect(
      screen.queryByText("Are you sure want to save test score?")
    ).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("submitTest"));

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );

    expect(
      screen.queryByText("Test score saved successfully")
    ).toBeInTheDocument();

    fireEvent.click(screen.queryAllByTestId("SuccessOkBtn")[0]);

    expect(pushMock).toHaveBeenCalledWith("/patient/measure");
  });

  test("on cancel it should redirect to measure list page", async () => {
    await sut();

    fireEvent.click(screen.queryByTestId("cancel-test-btn"));

    expect(pushMock).toHaveBeenCalledWith("/patient/measure");
  });
});
