import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";
import {
  GET_FORMULATION_BY_SHARE_ID,
  UPDATE_PAT_FORMULATION_BY_ID,
} from "../graphql/formulation/graphql";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme/theme";
import PatientEditTemplatePage from "../pages/patient/formulation/edit/[id]";
const useRouter = jest.spyOn(require("next/router"), "useRouter");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

// formulation detail
mocksData.push({
  request: {
    query: GET_FORMULATION_BY_SHARE_ID,
    variables: {
      ptsharresId: "46cb932a4c6346268ec4c13009cdd1b5",
    },
  },
  result: {
    data: {
      getFormulationByShareId: [
        {
          _id: "46cb932a4c6346268ec4c13009cdd1b5",
          created_date: "2022-04-20T09:27:30.000Z",
          formulation_data: [
            {
              user_id: "d873f1f8436e4117b760db3a54c05026",
              formulation_url: null,
              formulation_type: null,
              formulation_status: 1,
              formulation_returnurl: null,
              formulation_name: "19th april amar",
              formulation_instruction: null,
              formulation_img: "",
              formulation_desc: "test ",
              formulation_avail_for: "[1]",
              download_formulation_url: null,
              __typename: "FormulationData",
            },
          ],
          formulation_id: "306cd6f0b2d5454c9385c09d749bed17",
          patient_id: "47aedf8a20344f68b8f064c94160046d",
          share_from: "686802e5123a482681a680a673ef7f53",
          updated_date: "2022-04-20T09:27:30.000Z",
          __typename: "Patshareformulation",
        },
      ],
    },
  },
});

// doc formulation
mocksData.push({
  request: {
    query: GET_FORMULATION_BY_SHARE_ID,
    variables: {
      ptsharresId: "46cb932a4c6346268ec4c13009cdd1b6",
    },
  },
  result: {
    data: {
      getFormulationByShareId: [
        {
          _id: "46cb932a4c6346268ec4c13009cdd1b6",
          created_date: "2022-04-20T09:27:30.000Z",
          formulation_data: [
            {
              user_id: "d873f1f8436e4117b760db3a54c05026",
              formulation_url: null,
              formulation_type: null,
              formulation_status: 1,
              formulation_returnurl: null,
              formulation_name: "19th april amar",
              formulation_instruction: null,
              formulation_img: "",
              formulation_desc: "test ",
              formulation_avail_for: "[1]",
              download_formulation_url: "https://google.com",
              __typename: "FormulationData",
            },
          ],
          formulation_id: "306cd6f0b2d5454c9385c09d749bed18",
          patient_id: "47aedf8a20344f68b8f064c94160046d",
          share_from: "686802e5123a482681a680a673ef7f53",
          updated_date: "2022-04-20T09:27:30.000Z",
          __typename: "Patshareformulation",
        },
      ],
    },
  },
});

// update template
mocksData.push({
  request: {
    query: UPDATE_PAT_FORMULATION_BY_ID,
    variables: {
      ptsharresId: "46cb932a4c6346268ec4c13009cdd1b5",
      updateShareForm: {
        // eslint-disable-next-line prettier/prettier
        template_response:
          '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":473.2414156225255,"y":117.2588609700811},"data":{"label":"test","description":"test","patientResponse":"test"},"style":{"width":298,"height":248},"selected":false,"dragging":false,"positionAbsolute":{"x":473.2414156225255,"y":117.2588609700811}},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":89.67422782202881,"y":153.20227159497477},"data":{"label":"","patientResponse":"test"},"style":{"width":298,"height":248},"positionAbsolute":{"x":89.67422782202881,"y":153.20227159497477}}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}',
      },
    },
  },
  result: {
    data: {
      updatePatFormulationById: {
        _id: "46cb932a4c6346268ec4c13009cdd1b5",
        formulation_id: "306cd6f0b2d5454c9385c09d749bed17",
        template_id: null,
        template_response:
          '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":473.2414156225255,"y":117.2588609700811},"data":{"label":"test","description":"test","patientResponse":"test"},"style":{"width":298,"height":248},"selected":false,"dragging":false,"positionAbsolute":{"x":473.2414156225255,"y":117.2588609700811}},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":89.67422782202881,"y":153.20227159497477},"data":{"label":"","patientResponse":"test"},"style":{"width":298,"height":248},"positionAbsolute":{"x":89.67422782202881,"y":153.20227159497477}}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}',
        __typename: "UpdatePatientFormulation",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <PatientEditTemplatePage />
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
        user_type: "patient",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        patient_data: {
          therapist_id: "a8bf94e308d04c598d0a06413cf30ef1",
        },
      },
    });
  });
  it("formulation detail", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "46cb932a4c6346268ec4c13009cdd1b6",
      },
    }));
    await sut();
    await waitFor(() => {
      expect(screen.getByTestId("downloadIconButton")).toBeInTheDocument();
    });
  });

  it("check doc formulation", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "46cb932a4c6346268ec4c13009cdd1b5",
      },
    }));
    await sut();
    await waitFor(() => {
      expect(screen.queryByText("Formulation Detail")).toBeInTheDocument();
    });
  });
});
