import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/styles";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import { THERAPIST_PATIENT_LIST } from "../graphql/Feedback/graphql";
import TherapistPatientListPage from "../pages/therapist/patientlist";
import {
  THERAPIST_ADD_PATIENT,
  THERAPIST_DELETE_PATIENT,
} from "../graphql/mutation";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: THERAPIST_PATIENT_LIST,
    variables: {
      search_text: "",
      page_no: 1,
      limit: 10,
    },
  },
  result: {
    data: {
      getPatientList: {
        patientlist: [
          {
            patient_firstname: "feedback patient",
            patient_lastname: "patient",
            created_date: "2023-08-09T11:32:42.584Z",
            update_date: null,
            _id: "c5e4fc9a-9a1d-4668-b434-b28a682a24e8",
            __typename: "Patient",
          },
        ],
        total: 188,
        __typename: "PatientListData",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_ADD_PATIENT,
    variables: {
      email: "test@gmail.com",
      patient_firstname: "name",
      patient_lastname: "Last",
      phone_number: "+440345725133",
    },
  },
  result: {
    data: {
      addPatient: {
        message: null,
        result: "256c0f15-f7a6-436c-a942-a74691fdf90b",
        __typename: "resultId",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_DELETE_PATIENT,
    variables: { patient_id: "c5e4fc9a-9a1d-4668-b434-b28a682a24e8" },
  },
  result: {
    data: {
      addPatient: {
        message: null,
        result: "256c0f15-f7a6-436c-a942-a74691fdf90b",
        __typename: "resultId",
      },
    },
  },
});
const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistPatientListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist patient list page", () => {
  it("should render list", async () => {
    await sut();
    expect(await screen.findByText(/feedback patient/i)).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("createPlanButton"));
  });

  test("Add patient", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.queryByTestId("createPlanButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("createPlanButton"));

      expect(screen.queryByTestId("patient_firstname")).toBeInTheDocument();
      fireEvent.change(screen.queryByTestId("patient_firstname"), {
        target: { value: "name" },
      });

      fireEvent.change(screen.queryByTestId("patient_lastname"), {
        target: { value: "Last" },
      });

      fireEvent.change(screen.queryByTestId("email"), {
        target: { value: "test@gmail.com" },
      });

      fireEvent.change(screen.queryByTestId("phone_number"), {
        target: { value: "+440345725133" },
      });

      fireEvent.click(screen.queryByTestId("editTemplateSubmitButton"));

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Patient added successfully!")
        ).toBeInTheDocument();
      });

      // expect(screen.queryAllByTestId("table-row").length).toBe(0);
    });
  });

  test("Delete patient", async () => {
    await sut();
    await waitFor(async () => {
      expect(
        screen.queryByTestId(
          "iconButton_delete_c5e4fc9a-9a1d-4668-b434-b28a682a24e8"
        )
      ).toBeInTheDocument();
      fireEvent.click(
        screen.queryByTestId(
          "iconButton_delete_c5e4fc9a-9a1d-4668-b434-b28a682a24e8"
        )
      );

      await waitFor(async () => {
        expect(screen.queryByTestId("sureModal")).toBeInTheDocument();

        expect(
          screen.getByTestId("addResourceModalConfirmButton")
        ).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("addResourceModalConfirmButton"));
      });

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Patient deleted successfully!")
        ).toBeInTheDocument();
      });
    });
  });
});
