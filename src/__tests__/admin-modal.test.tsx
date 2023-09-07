import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { ADMIN_ADD_MODAL } from "../graphql/assessment/graphql";
import theme from "../styles/theme/theme";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";
import AddModel from "../components/admin/therapiesPages/modal/create";
import { GET_DISORDER_DATA_BY_ORG_ID } from "../graphql/query/common";
import ModalListPage from "../components/admin/therapiesPages/modal";
import { GET_ADMIN_MODEL_LIST } from "../graphql/category/graphql";
import { GET_THERAPIST_LIST_BY_ORG_ID } from "../graphql/mutation/admin";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];
const listMocksData = [];

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
          name: "I am organization",
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
        {
          _id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
          contract: "Contract",
          created_date: "2022-12-22T06:26:48.828Z",
          logo: "20221228124410__admin_platform_-_preview_template.PNG",
          logo_url: null,
          name: "admin resource draw5",
          panel_color: "3",
          patient: "Pat",
          patient_plural: "Patis",
          patient_welcome_email: "Therapy",
          side_menu_color: "4",
          therapist: "Ther",
          therapy: "Therap",
          __typename: "Organization",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_DISORDER_DATA_BY_ORG_ID,
    variables: { orgId: "d1f2bbd3-3388-4ca2-9d68-55b95574a269" },
  },
  result: {
    data: {
      getDisorderByOrgId: [
        {
          _id: "disorder_id_1",
          user_type: "admin",
          disorder_name: "disorder 1",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_ADD_MODAL,
    variables: { model_name: "name therapy", disorder_id: "disorder_id_1" },
  },
  result: {
    data: {
      adminAddModel: {
        message: "Modal added successfully",
        result: true,
        __typename: "result",
      },
    },
  },
});

/* for list */
//org list
listMocksData.push({
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
          name: "I am organization",
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
        {
          _id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
          contract: "Contract",
          created_date: "2022-12-22T06:26:48.828Z",
          logo: "20221228124410__admin_platform_-_preview_template.PNG",
          logo_url: null,
          name: "admin resource draw5",
          panel_color: "3",
          patient: "Pat",
          patient_plural: "Patis",
          patient_welcome_email: "Therapy",
          side_menu_color: "4",
          therapist: "Ther",
          therapy: "Therap",
          __typename: "Organization",
        },
      ],
    },
  },
});
// model list
listMocksData.push({
  request: {
    query: GET_ADMIN_MODEL_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "",
    },
  },
  result: {
    data: {
      getAdminModelList: [
        {
          _id: "b89f17ad-11ef-41a8-9a15-ceff2eb42cfa",
          created_date: "2023-09-07T13:57:46.366Z",
          disorder_detail: [
            {
              _id: "30eff80ba51745b39b92ae042271bca4",
              created_date: "2023-06-28T08:06:18.000Z",
              disorder_name: "Sun update",
              disorder_status: 1,
              therapy_id: "38f5c75b3950498ab548c8ab72a5e2be",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "Disorder",
            },
          ],
          disorder_id: "30eff80ba51745b39b92ae042271bca4",
          model_name: "test-new-model",
          therapy_detail: [
            {
              _id: "38f5c75b3950498ab548c8ab72a5e2be",
              created_date: "2022-05-31T03:28:28.000Z",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              therapy_name: "T2",
              therapy_status: 1,
              updated_date: null,
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "TherapyData",
            },
          ],
          updated_date: "2023-09-07T13:57:46.366Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          model_status: 1,
          __typename: "ModelList",
        },
        {
          _id: "57bf6fc2-6662-42c5-8687-0c23571efe56",
          created_date: "2023-09-07T08:02:48.584Z",
          disorder_detail: [
            {
              _id: "dc185f7d-eecf-4c9f-b9e3-6af40e72dc0f",
              created_date: "2023-08-31T10:32:05.260Z",
              disorder_name: "multi select disorder",
              disorder_status: 1,
              therapy_id: "dd1889b0-c33a-4012-a4b9-b7a124a741ca",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "Disorder",
            },
          ],
          disorder_id: "dc185f7d-eecf-4c9f-b9e3-6af40e72dc0f",
          model_name: "Test Modal",
          therapy_detail: [
            {
              _id: "dd1889b0-c33a-4012-a4b9-b7a124a741ca",
              created_date: "2023-08-31T10:10:26.595Z",
              org_id: "6245dc7e-9885-4a3d-8b9c-3eeb38213ce7",
              therapy_name: "Therapy multi select",
              therapy_status: 1,
              updated_date: "2023-08-31T10:10:26.595Z",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "TherapyData",
            },
          ],
          updated_date: "2023-09-07T08:02:48.584Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          model_status: 1,
          __typename: "ModelList",
        },
        {
          _id: "28e2b08d-7f58-4b09-90ea-424317b559f2",
          created_date: "2023-08-08T08:33:14.781Z",
          disorder_detail: [
            {
              _id: "467925dfc1d34c9e9eecd3cd915588d9",
              created_date: "2021-12-30 16:15:05",
              disorder_name: "test mong edit",
              disorder_status: 1,
              therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "Disorder",
            },
          ],
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_name: "latest model",
          therapy_detail: [
            {
              _id: "a8bf94e308d04c598d0a06413cf30ef1",
              created_date: "2021-12-30 16:13:56",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              therapy_name: "testing mongo",
              therapy_status: 1,
              updated_date: null,
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "TherapyData",
            },
          ],
          updated_date: "2023-08-08T08:33:14.781Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          model_status: 1,
          __typename: "ModelList",
        },
      ],
    },
  },
});

// model list by org
listMocksData.push({
  request: {
    query: GET_ADMIN_MODEL_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      searchText: "",
      orgId: "2301536c4d674b3598814174d8f19593",
    },
  },
  result: {
    data: {
      getAdminModelList: [
        {
          _id: "b89f17ad-11ef-41a8-9a15-ceff2eb42cfa",
          created_date: "2023-09-07T13:57:46.366Z",
          disorder_detail: [
            {
              _id: "30eff80ba51745b39b92ae042271bca4",
              created_date: "2023-06-28T08:06:18.000Z",
              disorder_name: "Sun update",
              disorder_status: 1,
              therapy_id: "38f5c75b3950498ab548c8ab72a5e2be",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "Disorder",
            },
          ],
          disorder_id: "30eff80ba51745b39b92ae042271bca4",
          model_name: "filter by org",
          therapy_detail: [
            {
              _id: "38f5c75b3950498ab548c8ab72a5e2be",
              created_date: "2022-05-31T03:28:28.000Z",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              therapy_name: "T2",
              therapy_status: 1,
              updated_date: null,
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              __typename: "TherapyData",
            },
          ],
          updated_date: "2023-09-07T13:57:46.366Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          model_status: 1,
          __typename: "ModelList",
        },
      ],
    },
  },
});

// therapy list by org
listMocksData.push({
  request: {
    query: GET_THERAPIST_LIST_BY_ORG_ID,
    variables: {
      orgId: "72b6b276ee55481682cb9bf246294faa",
    },
  },
  result: {
    data: {
      getTherapyListByOrgId: [
        {
          _id: "18a00bdb-a27d-40c5-a858-e6047444636b",
          created_date: "2023-08-02T14:09:14.808Z",
          org_id: "72b6b276ee55481682cb9bf246294faa",
          therapy_name: "appsync",
          therapy_status: 1,
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "TherapyList",
        },
      ],
    },
  },
});

const createSut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AddModel />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <ModalListPage />
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
describe("Admin modal list", () => {
  it("Add modal", async () => {
    await createSut();

    await waitFor(async () => {
      expect(screen.getByTestId("addModalButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("addModalButton"));

      expect(screen.getByTestId("therapy_name")).toBeInTheDocument();

      await waitFor(async () => {
        fireEvent.change(screen.queryByTestId("therapy_name"), {
          target: { value: "name therapy" },
        });

        fireEvent.change(screen.queryByTestId("select_organisation1"), {
          target: { value: "d1f2bbd3-3388-4ca2-9d68-55b95574a269" },
        });

        await expect(
          screen.queryByTestId("select_organisation1").getAttribute("value")
        ).toBe("d1f2bbd3-3388-4ca2-9d68-55b95574a269");
      });

      await waitFor(async () => {
        fireEvent.change(screen.queryByTestId("disorder_id"), {
          target: { value: "disorder_id_1" },
        });

        await expect(
          screen.queryByTestId("disorder_id").getAttribute("value")
        ).toBe("disorder_id_1");
      });

      expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("addSubmitForm"));

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });
      await waitFor(async () => {
        expect(
          screen.getByText("Modal added successfully!")
        ).toBeInTheDocument();
      });
    });
  });

  it("render modal list", async () => {
    await sut();
    waitFor(async () => {
      expect(await screen.findByText("test-new-model")).toBeInTheDocument();
      expect(await screen.findByText("Test Modal")).toBeInTheDocument();
      await selectDropDown("organizationSelect");
      expect(await screen.findByText("filter by org")).toBeInTheDocument();
      expect(await screen.findByText("test-new-model")).not.toBeInTheDocument();
      expect(await screen.findByText("Test Modal")).not.toBeInTheDocument();
    });
  });
});
