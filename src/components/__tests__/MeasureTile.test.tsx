import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { Measure } from "../../graphql/query/Measure/types";
import { MeasureTile } from "../patient/measure/measureTile";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const measure: Measure = {
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
};

describe("when rendered with a `visible` prop", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });
  it("should visible or hide", async () => {
    render(<MeasureTile measure={measure} />);

    expect(screen.queryByTestId("name").textContent).toBe(
      measure.measure_cat_name
    );

    expect(screen.queryByTestId("view-score-btn")).not.toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("toggleContent"));

    expect(screen.queryByTestId("view-score-btn")).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.click(screen.queryByTestId("view-score-btn"))
    );

    expect(pushMock).toHaveBeenCalledWith(`/patient/score/${measure._id}`);

    await waitFor(() => fireEvent.click(screen.queryByTestId("take-test-btn")));

    expect(pushMock).toHaveBeenCalledWith(`/patient/test/${measure._id}`);
  });
});
