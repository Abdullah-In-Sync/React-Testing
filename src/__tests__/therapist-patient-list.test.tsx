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
      limit: 10,
      next_pagination_token: "",
      name: "",
    },
  },
  result: {
    data: {
      getPatientList: {
        pagination:
          "CAIS4QIIARK6AggDErUCAHC+Q0Bz3YhIqZ+/fkE3qbRRphNpnOGQZ3MJTLqaUVqZeyJAbiI6IlBhZ2luYXRpb25Db250aW51YXRpb25EVE8iLCJuZXh0S2V5IjoiQUFBQUFBQUFEUDJPQVFFQlZmblF3OER5U0E2OTRmdWVoQ21sZWdLU3lOOUViRXczbjY0RHNRU1VZWTFsYm1ZN200Nkc0OEhBNU9XYXpLYWptNFRvdUptTng0T0xoT3k0bUppbTQ3bk55dWFiMmNiVG1BQ0F3S3JmenNPSHdQbVNnZXZ2aC9lZXdvcTAxOURBM2FtNXo5cTBoYkxUaFkyc3JLaTUxZkFBQVRzPSIsInBhZ2luYXRpb25EZXB0aCI6MTAsInByZXZpb3VzUmVxdWVzdFRpbWUiOjE2ODk4NjEzMTkwNzZ9GiCHjyFeZQHPXWoD0FVPqefm/q8gIC8y02gG81kBSvIlbw==",
        patientlist: [
          {
            email: "syeda.naziahassan06@gmail.com",
            name: "Nazia Hassan",
            patient_id: "c0320bceab244bbb9deef97ba7f41c9acsc",
            phone_number: "+4403457251227",
            __typename: "PatientList",
          },
          // {
          //   email: "sh@gmail.com",
          //   name: "Shubham Srivaatav",
          //   patient_id: "c0320bceab244bbb9deef97ba7f41c9a",
          //   phone_number: "+448989898989",
          //   __typename: "PatientList",
          // },
        ],
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
      phone_number: "+4403457251333",
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
    variables: { patient_id: "c0320bceab244bbb9deef97ba7f41c9acsc" },
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
    expect(await screen.findByText(/Nazia Hassan/i)).toBeInTheDocument();
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
        target: { value: "+4403457251333" },
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
        screen.queryByTestId("iconButton_delete_undefined")
      ).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("iconButton_delete_undefined"));

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
