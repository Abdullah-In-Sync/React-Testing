import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
import TherapistAssessmentMain from "../pages/therapist/patient/view/[id]/assessment";
import {
  THERAPIST_ADD_ASSESSMENT,
  THERAPIST_ADD_ASSESSMENT_DROPDOWN_LIST,
} from "../graphql/assessment/graphql";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../contexts/AuthContext");
const mocksData = [];

mocksData.push({
  request: {
    query: THERAPIST_ADD_ASSESSMENT_DROPDOWN_LIST,
  },
  result: {
    data: {
      getAdminAssessmentList: [
        {
          _id: "d5f6c50e-5617-4613-bfc4-c85c973b8966",
          name: "Assessment name",
          organization_name: null,
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          created_date: "2023-06-16T11:58:45.035Z",
          status: 1,
          updated_date: "2023-06-16T11:58:45.035Z",
          __typename: "AdminAssessment",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_ADD_ASSESSMENT,

    variables: {
      assessment_id: "d5f6c50e-5617-4613-bfc4-c85c973b8966",
      patient_id: null,
    },
  },
  result: {
    data: {
      therapistAddAssessment: {
        message: "Assessment already added",
        result: false,
        __typename: "result",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistAssessmentMain />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist patient safety plan", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        },
      },
    });
  });

  it("should render view accordian data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("addAssessmentButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("addAssessmentButton"));
    });

    await waitFor(async () => {
      fireEvent.change(screen.queryByTestId("name"), {
        target: { value: "d5f6c50e-5617-4613-bfc4-c85c973b8966" },
      });
      expect(screen.queryByTestId("name").getAttribute("value")).toBe(
        "d5f6c50e-5617-4613-bfc4-c85c973b8966"
      );

      fireEvent.click(screen.queryByTestId("addSubmitForm"));
    });
    await waitFor(async () => {
      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));
    });

    await waitFor(async () => {
      expect(
        screen.queryByText("Assessment added successfully!")
      ).toBeInTheDocument();

      //   fireEvent.click(screen.queryByTestId("confirmButton"));
    });
  });

  //   it("Delete monitor", async () => {
  //     await sut();
  //     await waitFor(async () => {
  //       expect(screen.getByTestId("button-edit-icon")).toBeInTheDocument();

  //       fireEvent.click(screen.queryByTestId("button-edit-icon"));

  //       expect(
  //         screen.getByText("Are you sure you want to delete the monitor?")
  //       ).toBeInTheDocument();

  //       fireEvent.click(screen.queryByTestId("confirmButton"));

  //       expect(
  //         screen.getByText("Monitor deleted successfully")
  //       ).toBeInTheDocument();
  //     });
  //   });
});
