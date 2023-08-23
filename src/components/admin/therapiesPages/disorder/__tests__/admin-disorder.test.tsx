import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useRouter } from "next/router";
import {
  ADD_ADMIN_DISORDER,
  GET_ADMIN_DISORDER_LIST,
  GET_ADMIN_THERAPY_LIST,
  UPDATE_ADMIN_DISORDER,
} from "../../../../../graphql/disorder/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import AdminTherapiesPage from "../../../../../pages/admin/therapies";
import theme from "../../../../../styles/theme/theme";
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
            org_id: "orgid1",
            _id: "therapy1",
          },
          {
            therapy_name: "Therapy Model disorder Category Edit",
            therapy_status: 1,
            organization_name: "portal.dev-myhelp",
            org_id: "orgid2",
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
            _id: "disorder1",
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
            _id: "disorder2",
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
            _id: "disorder1",
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
            _id: "disorder2",
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

mocksData.push({
  request: {
    query: ADD_ADMIN_DISORDER,
    variables: {
      disorder_name: "diordername",
      therapy_id: "therapy2",
    },
  },
  result: {
    data: {
      adminAddDisorder: {
        message: "Disorder Added Successfully",
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_ADMIN_DISORDER,
    variables: {
      disorder_id: "disorder1",
      update_disorder: {
        disorder_status: 0,
      },
    },
  },
  result: {
    data: {
      adminUpdateDisorder: {
        _id: "disorder1",
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
  it("should render tharapy filter list and new disorder", async () => {
    await sut();
    expect(await screen.findByText(/therapy detail/i)).toBeInTheDocument();
    fireEvent.change(await screen.findByTestId("searchInput"), {
      target: { value: "stext" },
    });
    await selectDropDown("therapySelect");
    await selectDropDown("organizationSelect");
    expect(await screen.findByText(/search text/i)).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("addDisorderButton"));
    fireEvent.change(await screen.findByTestId("disorderName"), {
      target: { value: "diordername" },
    });
    await selectDropDown("therapySelectModal");
    fireEvent.click(await screen.findByTestId("addDisorderSubmit"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText(/Disorder added successfully!/i)
    ).toBeInTheDocument();
  });

  it("should delete disorder", async () => {
    await sut();
    fireEvent.click(await screen.findByTestId("iconButton_delete_disorder1"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText(/Disorder deleted successfully!/i)
    ).toBeInTheDocument();
  });
});
