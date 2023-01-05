import {
  screen,
  render,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";

import Measure from "../pages/patient/measure";
import { GET_PATIENT_MEASURE_LIST } from "../graphql/Measure/graphql";
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
    query: GET_PATIENT_MEASURE_LIST,
  },
  result: {
    data: {
      getPatientMeasureList: [
        {
          user_type: "therapist",
          user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          status: 2,
          patient_id: "1b112127af834c3e82f13daa3e84c495",
          measure_cat_type: 1,
          measure_cat_name: "test",
          last_completed_date: null,
          is_default: 0,
          created_date: "2022-03-24T13:50:05.000Z",
          _id: "1f48d0c3b8834d5a85836367bc6cb0b5",
          __typename: "MeasureCat",
        },
        {
          user_type: "therapist",
          user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          status: 2,
          patient_id: "c852c5de6ff14aee8a43804ea9d57ce3",
          measure_cat_type: 1,
          measure_cat_name: "measure for patient only",
          last_completed_date: "2022-12-18T07:01:16.000Z",
          is_default: 0,
          created_date: "2022-04-29T06:08:23.000Z",
          _id: "98392bff10104aa3a4aa3908141ec65a",
          __typename: "MeasureCat",
        },
        {
          user_type: "therapist",
          user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          status: 2,
          patient_id: "6605f4c3992c4fa691a1317c69054ae8",
          measure_cat_type: 1,
          measure_cat_name: "Ravi test",
          last_completed_date: "2022-12-23T10:13:58.000Z",
          is_default: 0,
          created_date: "2022-12-23T10:10:39.000Z",
          _id: "f7ebcd5b73874d2691bce97a70b6035f",
          __typename: "MeasureCat",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <Measure />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Measure list", () => {
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

  test("Renders measure list", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.queryAllByTestId("list-tile").length).toEqual(3);
    });
    await waitFor(() =>
      fireEvent.click(
        within(screen.queryAllByTestId("list-tile")[1]).getByTestId(
          "toggleContent"
        )
      )
    );
    await waitFor(() =>
      fireEvent.click(screen.queryByTestId("view-score-btn"))
    );

    expect(pushMock).toHaveBeenCalledWith(
      `/patient/measure/score/98392bff10104aa3a4aa3908141ec65a`
    );
    await waitFor(() => fireEvent.click(screen.queryByTestId("take-test-btn")));
    expect(pushMock).toHaveBeenCalledWith(
      `/patient/measure/test/98392bff10104aa3a4aa3908141ec65a`
    );
  });

  test("If score data is not available it will show the error popup", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.queryAllByTestId("list-tile").length).toEqual(3);
    });
    await waitFor(() =>
      fireEvent.click(
        within(screen.queryAllByTestId("list-tile")[0]).getByTestId(
          "toggleContent"
        )
      )
    );
    await waitFor(() =>
      fireEvent.click(screen.queryByTestId("view-score-btn"))
    );

    expect(
      screen.queryByText("No Score information is available")
    ).toBeInTheDocument();
  });

  test("If test already token for today it will show the error popup", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.queryAllByTestId("list-tile").length).toEqual(3);
    });
    await waitFor(() =>
      fireEvent.click(
        within(screen.queryAllByTestId("list-tile")[2]).getByTestId(
          "toggleContent"
        )
      )
    );
    await waitFor(() => fireEvent.click(screen.queryByTestId("take-test-btn")));

    expect(
      screen.queryByText("Today test has been taken already")
    ).toBeInTheDocument();
  });
});
