import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import theme from "../../../../styles/theme/theme";
import { GET_ADMIN_MONITOR_LIST } from "../../../../graphql/Monitor/graphql";
import MonitorListPage from "../../../../pages/admin/monitor";

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
          _id: "2301536c4d674b3598814174d8f19593",
          contract: "<p>Test contract</p>",
          created_date: "2021-12-31 05:54:13",
          logo: "20211231055413__rest_easy.png",
          logo_url: null,
          name: "resteasy.dev-myhelp",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "patients",
          patient_welcome_email:
            "<p></p><p>Welcome to RestEasy</p><p>Your details have been given by [THERAPIST_NAME] to provide you access with the MyHelp platform. The platform will support your therapy allowing you to share information between yourself and your therapist. \t\t\t\t\t\t\tWe have created the MyHelp platform to support both therapist&#x27;s and patients in their pursuit of a smoother therapy process.</p><p>MyHelp empowers therapist&#x27;s throughout the entire process and delivers personalised care with the aim to improve patient outcomes. Simultaneously, patients can access their own platform to access key information to support their progress and communicate more efficiently with their therapist. We believe the MyHelp platform will enhance the therapeutic relationship in order to deliver better results. \t\t\t\t\t\t\tIn order to access your private area of the MyHelp platform you will need to:</p><p>Visit the website: https://resteasy.dev-myhelp.co.uk/</p><p>Enter the access details: Username – your email address, Password – [PASSWORD]</p><p>We recommend that you change your password by clicking the icon in the right hand corner to something personal and more memorable.</p><p>Now you have access to your personal therapy guide, which will be developed with the support of your therapist over the period of your therapy This will allow you to access the information and resources now and in the future.</p><p>If you have any other questions then please email info@myhelp.co.uk and we will endeavor to get back to you within 24 hours.</p><p>Thank you,</p><p>RestEasy Team.</p><p>P.S. Need help getting started? Please have a look at our help documentation or just reply to this email with any questions or issues you may have. The MyHelp support team is available to help with the platform only. Unfortunately, we do not provide mental health services and cannot support you in this respect. Please contact your therapist in such cases.</p>",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapys",
          __typename: "Organization",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MONITOR_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "",
    },
  },
  result: {
    data: {
      adminMonitorList: {
        total: 11,
        data: [
          {
            _id: "8fc88c5b-836b-44c7-84fb-541be843ce89",
            created_date: "2023-05-16T08:55:54.238Z",
            name: "monitor4",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: "portal.dev-myhelp",
            status: 1,
            updated_date: "2023-05-16T11:01:52.415Z",
            __typename: "AdminMonitor",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MONITOR_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      orgId: "2301536c4d674b3598814174d8f19593",
    },
  },
  result: {
    data: {
      adminMeasuresList: {
        total: 1,
        data: [
          {
            _id: "b53114db-2b7c-4d65-8dc1-59bc351e6eaa",
            created_date: "2023-05-15T07:54:28.550Z",
            name: "Name",
            org_id: "2301536c4d674b3598814174d8f19593",
            organization_name: "resteasy.dev-myhelp",
            status: 1,
            updated_date: "2023-05-15T07:54:28.550Z",
            __typename: "AdminMonitor",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MONITOR_LIST,
    variables: {
      limit: 10,
      orgId: "2301536c4d674b3598814174d8f19593",
      pageNo: 1,
      searchText: "Name",
    },
  },
  result: {
    data: {
      adminMeasuresList: {
        total: 1,
        data: [
          {
            _id: "b53114db-2b7c-4d65-8dc1-59bc351e6eaa",
            created_date: "2023-05-15T07:54:28.550Z",
            name: "Name",
            org_id: "2301536c4d674b3598814174d8f19593",
            organization_name: "resteasy.dev-myhelp",
            status: 1,
            updated_date: "2023-05-15T07:54:28.550Z",
            __typename: "AdminMonitor",
          },
        ],
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <MonitorListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const selectFromOrganizationDropdown = async () => {
  await sut();
  const nameText = await screen.findByText(/monitor4/i);
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
    target: { value: "Name" },
  });
  expect(await screen.findByText(/Name/i)).toBeInTheDocument();
};

describe("Admin monitor list", () => {
  it("should render admin monitor list with filter data", async () => {
    await selectFromOrganizationDropdown();
  });
});
