import { render, screen } from "@testing-library/react";
import PatientViewTherapyTab from "../therapist/patientViewTherapyTab";

describe("when rendered with a `test Id` component", () => {
  it("should visible", () => {
    render(
      <PatientViewTherapyTab activeTab={"safety_plan"} patientID={"test"} />
    );
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
  });
});
