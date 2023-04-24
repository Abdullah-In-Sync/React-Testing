import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import Measures from "..";

import { useRouter } from "next/router";
import {
  GET_THERAPIST_MEASURES_LIST,
  UPDATE_THERAPIST_MEASURE,
} from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_LIST,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
  },
  result: {
    data: {
      therapistListMeasures: [
        {
          _id: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
          created_date: "2023-04-18T05:38:05.573Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lglu2iohtqrvjvmgpun","question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test4",
          updated_date: "2023-04-18T05:38:05.573Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
          created_date: "2023-04-18T05:35:59.027Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgltzqyrky1itjq69dl","question":"test"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test3",
          updated_date: "2023-04-18T05:35:59.027Z",
          __typename: "TherapistMeasures",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_MEASURE,
    variables: {
      measure_id: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
      update: {
        description: "",
        share_status: 0,
        status: 0,
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lglu2iohtqrvjvmgpun","question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
        template_id: "format1",
        title: "test4",
      },
    },
  },
  result: {
    data: {
      updateTherapistMeasure: {
        _id: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_MEASURE,
    variables: {
      measure_id: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
      update: {
        description: "",
        share_status: 1,
        status: 1,
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgltzqyrky1itjq69dl","question":"test"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
        template_id: "format1",
        title: "test3",
      },
    },
  },
  result: {
    data: {
      updateTherapistMeasure: {
        _id: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_LIST,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-no-data",
    },
  },
  result: {
    data: {
      therapistListMeasures: [],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Measures />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
    push: pushMock,
  });
});

describe("Therapist patient measures", () => {
  it("should render therapist measures list", async () => {
    await sut();
    const firstTitleText = await screen.findByText(/test4/i);
    expect(firstTitleText).toBeInTheDocument();

    const firstPlusIcon = await screen.findByTestId("toggleContent0");
    fireEvent.click(firstPlusIcon);
    expect(await screen.findByText(/Current Score/i)).toBeInTheDocument();
  });

  it("click on share button", async () => {
    await sut();
    const shareButton = await screen.findByTestId(
      "iconButton_da31d1fa-48ca-4b67-b406-dd29db30ca9f_2"
    );
    fireEvent.click(shareButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);

    expect(
      await screen.findByText(/Your Measure has been shared successfully./i)
    ).toBeInTheDocument();
  });

  it("click on delete button", async () => {
    await sut();
    const deleteButton = await screen.findByTestId(
      "iconButton_a6e9bf54-76fe-49e0-8872-a7ff0681ccf7_1"
    );
    fireEvent.click(deleteButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Your Measure has been deleted successfully./i)
    ).toBeInTheDocument();
  });

  it("should render measures no data", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-no-data",
      },
      push: pushMock,
    });
    await sut();
    const noDataFoundText = await screen.findByText(/No data found./i);
    expect(noDataFoundText).toBeInTheDocument();
  });
});
