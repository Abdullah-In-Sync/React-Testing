import { Paper, Stack, styled } from "@mui/material";

export default function PatientViewTherapyTab({ activeTab, patientID }) {
  const Item = styled(Paper)(() => ({
    padding: "6px 16px",
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#6ec9db",
    cursor: "pointer",
    border: "none",
    boxShadow: "none",
    borderRadius: "7px",
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
        className="patientviewtherapy_tabs"
        direction="row"
        mt={3}
        spacing={1}
      >
        <Item
          onClick={navigateTo("safety_plan")}
          className={`${activeTab == "safety_plan" ? "active" : ""}`}
        >
          Safety Plan
        </Item>
        <Item
          onClick={navigateTo("measures")}
          className={`${activeTab == "measures" ? "active" : ""}`}
        >
          Measures
        </Item>
        <Item
          onClick={navigateTo("formulation")}
          className={`${activeTab == "formulation" ? "active" : ""}`}
        >
          Formulation
        </Item>
        <Item
          onClick={navigateTo("goals")}
          className={`${activeTab == "goals" ? "active" : ""}`}
        >
          Goals
        </Item>
        <Item
          onClick={navigateTo("tools")}
          className={`${activeTab == "tools" ? "active" : ""}`}
        >
          Tools
        </Item>
        <Item
          onClick={navigateTo("homework")}
          className={`${activeTab == "homework" ? "active" : ""}`}
        >
          Homework
        </Item>
        <Item
          onClick={navigateTo("relapse")}
          className={`${activeTab == "relapse" ? "active" : ""}`}
        >
          Relapse
        </Item>
        <Item
          onClick={navigateTo("resources")}
          className={`${activeTab == "resources" ? "active" : ""}`}
        >
          Resources
        </Item>
        <Item className={`${activeTab == "feedback" ? "active" : ""}`}>
          Feedback
        </Item>
      </Stack>
    </>
  );
}
