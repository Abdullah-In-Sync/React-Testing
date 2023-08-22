import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useRouter } from "next/router";
import {
  GET_ADMIN_DISORDER_LIST,
  GET_ADMIN_THERAPY_LIST,
} from "../../../../../graphql/disorder/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import theme from "../../../../../styles/theme/theme";
import AdminTherapiesPage from "../../../../../pages/admin/therapies";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ADMIN_THERAPY_LIST,
  },
  result: {
    data: {
      adminTherapyList: {
        data: [
          {
            therapy_name: "appsync",
            therapy_status: 1,
            organization_name: "arti real",
            org_id: "72b6b276ee55481682cb9bf246294faa",
            _id: "therapy1",
          },
          {
            therapy_name: "Therapy Model disorder Category Edit",
            therapy_status: 1,
            organization_name: "portal.dev-myhelp",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            _id: "therapy2",
          },
        ],
        total: 2,
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "org1",
          name: "portal.dev-myhelp",
        },
        {
          _id: "org2",
          name: "actions.dev-myhelp",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_DISORDER_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "",
    },
  },
  result: {
    data: {
      getAdminDisorderList: {
        data: [
          {
            _id: "2a11b2b1-32ef-47b4-bd44-63a1b0226a97",
            disorder_name: "Test Update Name",
            disorder_status: 1,
            organization_settings: [
              {
                _id: "517fa21a82c0464a92aaae90ae0d5c59",
                name: "portal.dev-myhelp",
              },
            ],
            therapy_detail: [
              {
                _id: "a8bf94e308d04c598d0a06413cf30ef1",
                therapy_name: "therapy detail",
              },
            ],
          },
          {
            _id: "a01fc64388764eb3ba1967c541088e8e",
            disorder_name: "Test Data",
            disorder_status: 1,
            organization_settings: [
              {
                _id: "517fa21a82c0464a92aaae90ae0d5c59",
                name: "portal.dev-myhelp",
              },
            ],
            therapy_detail: [
              {
                _id: "6572f356775b447e83838f5b54323765",
                therapy_name: "delete therapy",
              },
            ],
          },
        ],
        total: 2,
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_DISORDER_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "stext",
      therapyId: "therapy1",
      orgId: "org1",
    },
  },
  result: {
    data: {
      getAdminDisorderList: {
        data: [
          {
            _id: "2a11b2b1-32ef-47b4-bd44-63a1b0226a97",
            disorder_name: "Test Update Name",
            disorder_status: 1,
            organization_settings: [
              {
                _id: "org1",
                name: "portal.dev-myhelp",
              },
            ],
            therapy_detail: [
              {
                _id: "therapy1",
                therapy_name: "search text",
              },
            ],
          },
          {
            _id: "a01fc64388764eb3ba1967c541088e8e",
            disorder_name: "Test Data",
            disorder_status: 1,
            organization_settings: [
              {
                _id: "org1",
                name: "portal.dev-myhelp",
              },
            ],
            therapy_detail: [
              {
                _id: "therapy1",
                therapy_name: "delete therapy",
              },
            ],
          },
        ],
        total: 2,
      },
    },
  },
});

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      mainTab: "disorder",
    },
    push: pushMock,
  });
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AdminTherapiesPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const selectDropDown = async (dropdownTestId) => {
  const selectDropdown = await screen.findByTestId(dropdownTestId);
  expect(selectDropdown).toBeInTheDocument();

  const button = await within(selectDropdown).findByRole("button");
  fireEvent.mouseDown(button);

  const listbox = await within(
    await screen.findByRole("presentation")
  ).findByRole("listbox");
  const options = await within(listbox).findAllByRole("option");

  fireEvent.click(options[1]);
};

describe("Admin disorder therapy list", () => {
  it("should render tharapy filter list", async () => {
    await sut();
    expect(await screen.findByText(/therapy detail/i)).toBeInTheDocument();
    fireEvent.change(await screen.findByTestId("searchInput"), {
      target: { value: "stext" },
    });
    await selectDropDown("therapySelect");
    await selectDropDown("organizationSelect");
    expect(await screen.findByText(/search text/i)).toBeInTheDocument();
  });
});
