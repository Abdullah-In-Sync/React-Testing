import { fireEvent, render, screen } from "@testing-library/react";
import { Measure } from "../../graphql/Measure/types";
import { MeasureTile } from "../patient/measures/measureTile";

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
  current_score: "1",
  _id: "f7ebcd5b73874d2691bce97a70b6035f",
};

describe("when rendered with a `visible` prop", () => {
  it("should visible or hide", async () => {
    render(<MeasureTile measure={measure} />);

    expect(screen.queryByTestId("name").textContent).toBe(
      measure.measure_cat_name
    );

    expect(screen.queryByTestId("view-score-btn")).not.toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("toggleContent"));

    expect(screen.queryByTestId("view-score-btn")).toBeInTheDocument();
  });
});
