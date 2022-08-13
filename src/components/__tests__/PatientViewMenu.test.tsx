import { render, screen } from "@testing-library/react";
import PatientViewMenu from "../therapist/patientViewMenu";

describe("when rendered with a `test Id` component", () => {
  it("should visible", () => {
    render(<PatientViewMenu activeTab={"peronalinfo"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
  });
});
