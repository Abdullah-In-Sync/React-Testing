import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";
import { GET_PAT_FORMULATION_LIST } from "../graphql/formulation/graphql";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme/theme";
import TherapistPatientFormulation from "../pages/therapist/patient/view/[id]/formulation";
const useRouter = jest.spyOn(require("next/router"), "useRouter");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

// formulation list
mocksData.push({
  request: {
    query: GET_PAT_FORMULATION_LIST,
    variables: { patientId: "27f49dbe245843eda77fe5170ee074a8" },
  },
  result: {
    data: {
      getPatFormulationList: [
        {
          _id: "c7349895-c90c-4188-a35c-1b2b22673ed6",
          created_date: "2023-08-02T04:54:12.958Z",
          formulation_data: [
            {
              formulation_name: "test-table-template-",
              download_formulation_url: null,
              formulation_avail_for: "[1,2]",
              formulation_img: "",
              formulation_returnurl: null,
              formulation_url: null,
              __typename: "FormulationData",
            },
          ],
          template_detail: null,
          template_id: null,
          template_response: null,
          updated_date: "2023-08-02T04:54:12.958Z",
          __typename: "Patshareformulation",
        },
        {
          _id: "69ed4322-3de1-4a98-b14b-9949108efed0",
          created_date: "2023-08-02T04:52:57.969Z",
          formulation_data: [
            {
              formulation_name: "formulationwithtemplate",
              download_formulation_url: null,
              formulation_avail_for: "[2, 1]",
              formulation_img: "",
              formulation_returnurl: null,
              formulation_url: null,
              __typename: "FormulationData",
            },
          ],
          template_detail: null,
          template_id: null,
          template_response: null,
          updated_date: "2023-08-02T04:52:57.969Z",
          __typename: "Patshareformulation",
        },
        {
          _id: "aeb3882a-bd2a-4039-9cc6-f6937f2b03a8",
          created_date: "2023-08-02T04:49:00.058Z",
          formulation_data: [
            {
              formulation_name: "Test-formulation-file",
              download_formulation_url: null,
              formulation_avail_for: "[1]",
              formulation_img: "071502568__testing_with_magnifier_185604.jpeg",
              formulation_returnurl: null,
              formulation_url: null,
              __typename: "FormulationData",
            },
          ],
          template_detail: null,
          template_id: null,
          template_response: null,
          updated_date: "2023-08-02T04:49:00.058Z",
          __typename: "Patshareformulation",
        },
        {
          _id: "30456475-14c4-4372-9bbd-6592f88fb8a8",
          created_date: "2023-08-02T04:37:10.610Z",
          formulation_data: [
            {
              formulation_name: "000 000 sokdfa 17th july",
              download_formulation_url: null,
              formulation_avail_for: "[1]",
              formulation_img:
                "071636493__admin platform - able to share therapist formula.PNG",
              formulation_returnurl: null,
              formulation_url: null,
              __typename: "FormulationData",
            },
          ],
          template_detail: null,
          template_id: null,
          template_response: null,
          updated_date: "2023-08-02T04:37:10.610Z",
          __typename: "Patshareformulation",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistPatientFormulation />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Formulation list page", () => {
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
          org_id: "myhelp",
        },
      },
    });
  });
  it("Render Therapist patient formulation list", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "27f49dbe245843eda77fe5170ee074a8",
      },
    }));
    await sut();

    await waitFor(() => {
      expect(
        screen.getByTestId(
          "iconButton_view_c7349895-c90c-4188-a35c-1b2b22673ed6"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByTestId(
          "iconButton_delete_c7349895-c90c-4188-a35c-1b2b22673ed6"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByTestId(
          "iconButton_attachment_c7349895-c90c-4188-a35c-1b2b22673ed6"
        )
      ).toBeInTheDocument();
    });
  });
});
