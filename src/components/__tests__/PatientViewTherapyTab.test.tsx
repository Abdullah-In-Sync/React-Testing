import { render, screen } from "@testing-library/react";
import PatientViewTherapyTab from "../therapist/patientViewTherapyTab";

describe("when rendered with a `test Id` component", () => {
  it("should visible", () => {
    render(
      <PatientViewTherapyTab activeTab={"safety_plan"} patientID={"test"} />
    );
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
  });
  it("should visible measures", () => {
    render(<PatientViewTherapyTab activeTab={"measures"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("measuresTab")).toHaveClass("active");
  });
  it("should visible formulation", () => {
    render(
      <PatientViewTherapyTab activeTab={"formulation"} patientID={"test"} />
    );
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("formulationTab")).toHaveClass("active");
  });
  it("should visible feedback", () => {
    render(<PatientViewTherapyTab activeTab={"feedback"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("feedbackTab")).toHaveClass("active");
  });
  it("should visible tools", () => {
    render(<PatientViewTherapyTab activeTab={"tools"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("toolsTab")).toHaveClass("active");
  });
  it("should visible goals", () => {
    render(<PatientViewTherapyTab activeTab={"goals"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("goalsTab")).toHaveClass("active");
  });
  it("should visible resources", () => {
    render(
      <PatientViewTherapyTab activeTab={"resources"} patientID={"test"} />
    );
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("resourcesTab")).toHaveClass("active");
  });
  it("should visible relapse", () => {
    render(<PatientViewTherapyTab activeTab={"relapse"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("relapseTab")).toHaveClass("active");
  });
  it("should visible homework", () => {
    render(<PatientViewTherapyTab activeTab={"homework"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    expect(screen.getByTestId("homeworkTab")).toHaveClass("active");
  });
});
