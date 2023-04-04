import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
// import {

//   UPDATE_MEASURES,
// } from "../../../../graphql/Measure/graphql";
import { GET_ADMIN_MEASURES_LIST } from "../../../../graphql/Measure/graphql";

import MeasuresListPage from "../../../../pages/admin/measures";

import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
          contract:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
          created_date: "2022-12-05T09:47:11.000Z",
          logo: "",
          logo_url: null,
          name: "actions.dev-myhelp",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "Patients",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapy",
          __typename: "Organization",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MEASURES_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
    },
  },
  result: {
    data: {
      adminMeasuresList: {
        total: 11,
        data: [
          {
            _id: "d2393912-bdd6-47a1-98b7-49f9ce9756a0",
            created_date: "2023-01-12T14:32:58.269Z",
            description: "measures plan description",
            organization_name: "",
            org_id: "d7f146f32b1341b89c2efd6a457bdcd4",
            title: "test title",
            status: 1,
            updated_date: "2023-01-17T12:09:42.474Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MEASURES_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      orgId: "73ccaf14b7cb4a5a9f9cf7534b358c51",
    },
  },
  result: {
    data: {
      adminMeasuresList: {
        total: 5,
        data: [
          {
            _id: "c6bd39e6-5e89-4d26-9a5e-0a672f799a99",
            created_date: "2023-01-12T13:18:35.125Z",
            description: "measures plan description",
            organization_name: "portal.dev-myhelp",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            title: "march plan",
            status: 1,
            updated_date: "2023-01-17T12:15:17.288Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MEASURES_LIST,
    variables: {
      limit: 10,
      searchText: "plan",
      pageNo: 1,
      orgId: "73ccaf14b7cb4a5a9f9cf7534b358c51",
    },
  },
  result: {
    data: {
      adminMeasuresList: {
        total: 5,
        data: [
          {
            _id: "c6bd39e6-5e89-4d26-9a5e-0a672f799a99",
            created_date: "2023-01-12T13:18:35.125Z",
            description: "measures plan description",
            organization_name: "portal.dev-myhelp",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            title: "march plan",
            status: 1,
            updated_date: "2023-01-17T12:15:17.288Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MEASURES_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "plan",
      orgId: "73ccaf14b7cb4a5a9f9cf7534b358c51",
    },
  },
  result: {
    data: {
      adminMeasuresList: {
        total: 5,
        data: [
          {
            _id: "c6bd39e6-5e89-4d26-9a5e-0a672f799a99",
            created_date: "2023-01-12T13:18:35.125Z",
            description: "measures plan description",
            organization_name: "portal.dev-myhelp",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            title: "march plan",
            status: 1,
            updated_date: "2023-01-17T12:15:17.288Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MEASURES_LIST,
    variables: {
      limit: 10,
      pageNo: 2,
      searchText: "plan",
      orgId: "73ccaf14b7cb4a5a9f9cf7534b358c51",
    },
  },
  result: {
    data: {
      adminMeasuresList: {
        total: 5,
        data: [
          {
            _id: "c6bd39e6-5e89-4d26-9a5e-0a672f799a99",
            created_date: "2023-01-12T13:18:35.125Z",
            description: "measures plan description",
            name: "next page",
            organization_name: "portal.dev-myhelp",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            title: "fixed",
            status: 1,
            updated_date: "2023-01-17T12:15:17.288Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
          },
        ],
      },
    },
  },
});

// mocksData.push({
//   request: {
//     query: UPDATE_MEASURE,
//     variables: {
//       planId: "d2393912-bdd6-47a1-98b7-49f9ce9756a0",
//       updatePlan: {
//         status: 0,
//       },
//     },
//   },
//   result: {
//     data: {
//       updateMeasureById: {
//         _id: "d2393912-bdd6-47a1-98b7-49f9ce9756a0",
//       },
//     },
//   },
// });

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <MeasuresListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const selectFromOrganizationDropdown = async () => {
  await sut();
  const nameText = await screen.findByText(/test title/i);
  expect(nameText).toBeInTheDocument();
  const selectOrganization = screen.getByTestId("organizationSelect");
  expect(selectOrganization).toBeInTheDocument();

  const button = within(selectOrganization).getByRole("button");
  fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");
  const options = within(listbox).getAllByRole("option");

  fireEvent.click(options[1]);

  const searchInput = screen.getByTestId("searchInput");
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, {
    target: { value: "plan" },
  });

  expect(await screen.findByText(/march plan/i)).toBeInTheDocument();
};

describe("Admin measures list", () => {
  it("should render admin measures list with filter data", async () => {
    await selectFromOrganizationDropdown();
  });

  //   it("delele measure from list", async () => {
  //     await sut();
  //     const deleteButton = await screen.findByTestId(
  //       "iconButton_delete_d2393912-bdd6-47a1-98b7-49f9ce9756a0"
  //     );
  //     expect(deleteButton).toBeInTheDocument();
  //     fireEvent.click(deleteButton);

  //     const approveDeleteBtn = screen.queryByTestId(
  //       "approveDeletePlanModalConfirmButton"
  //     );
  //     expect(approveDeleteBtn).toBeInTheDocument();
  //     await waitFor(() => fireEvent.click(approveDeleteBtn));

  //     expect(await screen.findByTestId("SuccessOkBtn")).toBeInTheDocument();
  //   });
});
