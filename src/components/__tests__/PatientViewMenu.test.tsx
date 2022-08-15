import { render, screen } from "@testing-library/react";
import PatientViewMenu from "../therapist/patientViewMenu";

describe("when rendered with a `test Id` component", () => {
  it("should visible therapy", () => {
    render(<PatientViewMenu activeTab={"therapy"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("therapyTab")).toHaveClass("active");
  });
  it("should visible personalinfo", () => {
    render(<PatientViewMenu activeTab={"peronalinfo"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("patientViewMenu")).toHaveClass(
      "patientviewtabs"
    );
  });
  it("should visible assessment", () => {
    render(<PatientViewMenu activeTab={"assessment"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("assessmentTab")).toHaveClass("active");
  });
  it("should visible notesTab", () => {
    render(<PatientViewMenu activeTab={"notes"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("notesTab")).toHaveClass("active");
  });
  it("should visible appointmentsTab", () => {
    render(<PatientViewMenu activeTab={"appointments"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("appointmentsTab")).toHaveClass("active");
  });

  it("should visible todoTab", () => {
    render(<PatientViewMenu activeTab={"to_do"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("todoTab")).toHaveClass("active");
  });
  it("should visible filesTab", () => {
    render(<PatientViewMenu activeTab={"files"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("filesTab")).toHaveClass("active");
  });
  it("should visible communicationsTab", () => {
    render(<PatientViewMenu activeTab={"communications"} patientID={"test"} />);
    expect(screen.getByTestId("patientViewMenu")).toBeInTheDocument();
    expect(screen.getByTestId("communicationsTab")).toHaveClass("active");
  });
});
