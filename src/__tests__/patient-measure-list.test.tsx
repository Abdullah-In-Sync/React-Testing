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
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme/theme";

import Measure from "../components/patient/therapyPages/measures";
import { GET_PAITENT_MEASURES_LIST } from "../graphql/Measure/graphql";
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
    query: GET_PAITENT_MEASURES_LIST,
  },
  result: {
    data: {
      patientMeasureList: {
        message: "success",
        result: true,
        data: [
          {
            _id: "785d651b-0399-49c2-abe0-27697873c5f5",
            created_date: "2023-04-28T06:17:36.578Z",
            description: "",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            score: 0,
            score_date: "",
            score_id: "",
            session_no: "",
            scores_list: null,
            share_status: 1,
            status: 1,
            template_data:
              '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lh1lsm2g","question":"quwston1","answer":0},{"id":"lh1lsqxg","question":"quest2","answer":0},{"id":"lh1lsv9x","question":"quest3","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
            template_id: "format1",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            title: "testasdf",
            updated_date: "2023-04-29T06:30:38.470Z",
            __typename: "TherapistMeasures",
          },
          {
            _id: "9776be15-4e15-4573-9c45-9868dad0e50a",
            created_date: "2023-04-27T17:18:06.070Z",
            description: "",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            score: 1,
            score_date: "2023-04-28T10:31:29.016Z",
            score_id: "3af0686b-e59e-4948-89ce-359f93d8e2f3",
            session_no: "Session 4",
            scores_list: null,
            share_status: 1,
            status: 1,
            template_data:
              '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgze1k8e","question":"test","answer":0},{"id":"lgze1oqo","question":"test2","answer":0},{"id":"lgze1rsp","question":"test3","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
            template_id: "format1",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            title: "format21",
            updated_date: "2023-04-28T10:31:29.016Z",
            __typename: "TherapistMeasures",
          },
        ],
        __typename: "TherapistMeasuresResult",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Measure />
        </SnackbarProvider>
      </ThemeProvider>
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
      expect(screen.queryAllByTestId("list-tile").length).toEqual(2);
    });
    await waitFor(() =>
      fireEvent.click(
        within(screen.queryAllByTestId("list-tile")[0]).getByTestId(
          "toggleContent"
        )
      )
    );

    await waitFor(() => fireEvent.click(screen.queryByTestId("take-test-btn")));
    expect(pushMock).toHaveBeenCalledWith(
      `/patient/measures/test/785d651b-0399-49c2-abe0-27697873c5f5`
    );
  });

  test("If score data is not available it will show the error popup", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.queryAllByTestId("list-tile").length).toEqual(2);
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
      expect(screen.queryAllByTestId("list-tile").length).toEqual(2);
    });
    await waitFor(() =>
      fireEvent.click(
        within(screen.queryAllByTestId("list-tile")[1]).getByTestId(
          "toggleContent"
        )
      )
    );
    await waitFor(() => fireEvent.click(screen.queryByTestId("take-test-btn")));

    expect(
      screen.queryByText("Today’s test has been taken already")
    ).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.click(screen.queryByTestId("view-score-btn"))
    );

    expect(pushMock).toHaveBeenCalledWith(
      `/patient/measures/score/9776be15-4e15-4573-9c45-9868dad0e50a`
    );
  });
});
