import { Paper, Stack, styled } from "@mui/material";

export default function PatientViewMenu({ activeTab, patientID }) {
  const Item = styled(Paper)(() => ({
    padding: "6px 16px",
    textAlign: "center",
    color: "#8a8f94",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    boxShadow: "none",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  /* istanbul ignore next */
  const navigateTo = (tab: string) => () => {
    /* istanbul ignore else */
    window.location.href =
      "https://" +
      window.location.hostname +
      "/therapist/patient/view/" +
      patientID +
      "?tab=" +
      tab;
    return;
  };

  return (
    <>
      <Stack
        data-testid="patientViewMenu"
        className="patientviewtabs"
        direction="row"
        mt={3}
        spacing={0}
        style={{ borderBottom: "2px solid #689c8b" }}
      >
        <Item
          onClick={navigateTo("peronalinfo")}
          className={`${activeTab == "peronalinfo" ? "active" : ""}`}
        >
          Personal Info
        </Item>
        <Item
          data-testid="assessmentTab"
          onClick={navigateTo("assessment")}
          className={`${activeTab == "assessment" ? "active" : ""}`}
        >
          Assessment
        </Item>
        <Item
          onClick={navigateTo("therapy")}
          data-testid="therapyTab"
          className={`${activeTab == "therapy" ? "active" : ""}`}
        >
          Therapy
        </Item>
        <Item
          data-testId="notesTab"
          onClick={navigateTo("notes")}
          className={`${activeTab == "notes" ? "active" : ""}`}
        >
          Notes
        </Item>
        <Item
          data-testid="appointmentsTab"
          onClick={navigateTo("appointments")}
          className={`${activeTab == "appointments" ? "active" : ""}`}
        >
          Appointments
        </Item>
        <Item
          data-testid="todoTab"
          onClick={navigateTo("to_do")}
          className={`${activeTab == "to_do" ? "active" : ""}`}
        >
          To-Do
        </Item>
        <Item
          data-testid="filesTab"
          onClick={navigateTo("files")}
          className={`${activeTab == "files" ? "active" : ""}`}
        >
          Files
        </Item>
        <Item
          data-testid="communicationsTab"
          onClick={navigateTo("communications")}
          className={`${activeTab == "communications" ? "active" : ""}`}
        >
          Communications
        </Item>
      </Stack>
    </>
  );
}
