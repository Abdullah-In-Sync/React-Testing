import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import {
  ADD_ADMIN_CATEGORY,
  GET_ADMIN_CATEGORY_LIST,
} from "../../../../../graphql/category/graphql";
import {
  GET_ADMIN_DISORDER_LIST,
  GET_ADMIN_THERAPY_LIST,
} from "../../../../../graphql/disorder/graphql";
import { GET_ADMIN_MODEL_LIST } from "../../../../../graphql/model/graphql";
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
    query: GET_ADMIN_CATEGORY_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "",
    },
  },
  result: {
    data: {
      getAdminCategoryList: {
        total: 12,
        data: [
          {
            _id: "categoryid1",
            category_name: "category test",
            disorder_detail: [
              {
                _id: "disorderid1",
                disorder_name: "rest-order",
              },
            ],
            disorder_id: "disorderid1",
            model_detail: [
              {
                _id: "modelid1",
                disorder_id: "disorderid1",
                model_name: "rest-model",
              },
            ],
            model_id: "modelid1",
            updated_date: "2023-09-04T11:07:43.743Z",
            user_type: "admin",
            therapy_detail: [
              {
                _id: "therpayid1",
                org_id: "orgid1",
                therapy_name: "rest therapy",
              },
            ],
          },
          {
            _id: "categoryid2",
            category_name: "test",
            disorder_detail: [
              {
                _id: "disorderid2",
                disorder_name: "rest-order",
              },
            ],
            disorder_id: "disorderid2",
            model_detail: [
              {
                _id: "modelid2",
                disorder_id: "disorderid2",
                model_name: "rest-model",
              },
            ],
            model_id: "modelid2",
            updated_date: "2023-09-04T11:07:43.743Z",
            user_type: "admin",
            therapy_detail: [
              {
                _id: "therpayid2",
                org_id: "orgid2",
                therapy_name: "rest therapy",
              },
            ],
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_CATEGORY_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "stext",
      orgId: "org1",
      modelId: "modelid1",
      disorderId: "disorder1",
      therapyId: "therapy1",
    },
  },
  result: {
    data: {
      getAdminCategoryList: {
        total: 12,
        data: [
          {
            _id: "categoryid1",
            category_name: "search text",
            disorder_detail: [
              {
                _id: "disorderid1",
                disorder_name: "rest-order",
              },
            ],
            disorder_id: "disorderid1",
            model_detail: [
              {
                _id: "modelid1",
                disorder_id: "disorderid1",
                model_name: "rest-model",
              },
            ],
            model_id: "modelid1",
            updated_date: "2023-09-04T11:07:43.743Z",
            user_type: "admin",
            therapy_detail: [
              {
                _id: "therpayid1",
                org_id: "orgid1",
                therapy_name: "rest therapy",
              },
            ],
          },
          {
            _id: "categoryid2",
            category_name: "test",
            disorder_detail: [
              {
                _id: "disorderid2",
                disorder_name: "rest-order",
              },
            ],
            disorder_id: "disorderid2",
            model_detail: [
              {
                _id: "modelid2",
                disorder_id: "disorderid2",
                model_name: "rest-model",
              },
            ],
            model_id: "modelid2",
            updated_date: "2023-09-04T11:07:43.743Z",
            user_type: "admin",
            therapy_detail: [
              {
                _id: "therpayid2",
                org_id: "orgid2",
                therapy_name: "rest therapy",
              },
            ],
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_DISORDER_LIST,
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
    query: GET_ADMIN_MODEL_LIST,
  },
  result: {
    data: {
      getAdminModelList: {
        total: 11,
        data: [
          {
            _id: "modelid1",
            disorder_detail: [
              {
                _id: "disorder1",
                disorder_name: "Sun update",
              },
            ],
            disorder_id: "disorder1",
            model_name: "lwcdlmdlw",
            therapy_detail: [
              {
                _id: "therapyid1",
                org_id: "orgid1",
                therapy_name: "T2",
              },
            ],
          },
          {
            _id: "modelid2",
            disorder_detail: [
              {
                _id: "disorder2",
                disorder_name: "Sun update",
              },
            ],
            disorder_id: "disorder2",
            model_name: "lwcdlmdlw",
            therapy_detail: [
              {
                _id: "therapyid2",
                org_id: "orgid2",
                therapy_name: "T2",
              },
            ],
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADD_ADMIN_CATEGORY,
    variables: {
      org_id: "org1",
      category_name: "categoryFormName",
      disorder_id: "disorder1",
      model_id: "modelid1",
    },
  },
  result: {
    data: {
      adminAddDisorder: {
        message: "Category Added Successfully",
        result: true,
      },
    },
  },
});

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      mainTab: "category",
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

const selectDropDown = async (dropdownTestId, index) => {
  const selectDropdown = await screen.findByTestId(dropdownTestId);
  expect(selectDropdown).toBeInTheDocument();
  const button = await within(selectDropdown).findByRole("button");
  fireEvent.mouseDown(button);
  const listbox = await within(
    await screen.findByRole("presentation")
  ).findByRole("listbox");
  const options = await within(listbox).findAllByRole("option");
  fireEvent.click(options[index]);
};

describe("Admin category list", () => {
  it("should render tharapy filter list and new category", async () => {
    await sut();
    expect(await screen.findByText(/category test/i)).toBeInTheDocument();
    fireEvent.change(await screen.findByTestId("searchInput"), {
      target: { value: "stext" },
    });

    await selectDropDown("organizationSelect", 1);
    await selectDropDown("modelSelect", 1);
    await selectDropDown("disorderSelect", 1);
    await selectDropDown("therapySelect", 1);
    expect(await screen.findByText(/search text/i)).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("addCatetoryButton"));
    fireEvent.change(await screen.findByTestId("categoryFormName"), {
      target: { value: "categoryFormName" },
    });
    await selectDropDown("orgFormSelect", 0);
    await selectDropDown("disorderFormSelect", 0);
    await selectDropDown("modelFormSelect", 0);

    fireEvent.click(await screen.findByTestId("addCategorySubmit"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText(/Category added successfully!/i)
    ).toBeInTheDocument();
  });
});
