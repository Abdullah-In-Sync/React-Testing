import { fireEvent, render, screen } from "@testing-library/react";
import { PatientMeasureListEntity } from "../../graphql/Measure/types";
import { MeasureTile } from "../patient/measures/measureTile";
import theme from "../../styles/theme/theme";
import { ThemeProvider } from "@mui/material";

const measure: PatientMeasureListEntity = {
  _id: "785d651b-0399-49c2-abe0-27697873c5f5",
  created_date: "2023-04-28T06:17:36.578Z",
  description: "",
  patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
  score: 7,
  score_date: "2023-04-29T09:57:36.985Z",
  score_id: "ddf500c1-438e-43e3-8c24-6c8f1d68e6b6",
  session_no: "",
  scores_list: null,
  share_status: 1,
  status: 1,
  template_data:
    '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lh1lsm2g","question":"quwston1","answer":0},{"id":"lh1lsqxg","question":"quest2","answer":0},{"id":"lh1lsv9x","question":"quest3","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
  template_id: "format1",
  therapist_id: "686802e5123a482681a680a673ef7f53",
  title: "testasdf",
  updated_date: "2023-04-29T09:57:36.985Z",
  __typename: "TherapistMeasures",
};

describe("when rendered with a `visible` prop", () => {
  it("should visible or hide", async () => {
    render(
      <ThemeProvider theme={theme()}>
        <MeasureTile measure={measure} />
      </ThemeProvider>
    );

    expect(screen.queryByTestId("name").textContent).toBe(measure.title);

    expect(screen.queryByTestId("view-score-btn")).not.toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("toggleContent"));

    expect(screen.queryByTestId("view-score-btn")).toBeInTheDocument();
  });
});
