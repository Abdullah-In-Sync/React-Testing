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
import {
  ADMIN_ADD_MODAL,
  ADMIN_UPDATE_MODAL,
} from "../graphql/assessment/graphql";
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
mocksData.push({
  request: {
    query: GET_ADMIN_MODEL_LIST,
    variables: { limit: 10, pageNo: 1, searchText: "" },
  },
  result: {
    data: {
      getAdminModelList: {
        total: 19,
        data: [
          {
            _id: "5806b8eb-4386-4594-8b9b-bc241871f720",
            created_date: "2023-09-11T09:05:28.705Z",
            disorder_detail: [
              {
                _id: "8e65a3cf-410a-49e1-a7b9-ed2c2be916eb",
                created_date: "2023-09-08T07:49:06.158Z",
                disorder_name: "Test Data update",
                disorder_status: 1,
                therapy_id: "25a8e347-15c2-4a2d-ab6c-bb679a47a8d4",
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                user_type: "admin",
                __typename: "Disorder",
              },
            ],
            disorder_id: "8e65a3cf-410a-49e1-a7b9-ed2c2be916eb",
            model_name: "11thSeptModel1",
            therapy_detail: [
              {
                _id: "25a8e347-15c2-4a2d-ab6c-bb679a47a8d4",
                created_date: "2023-08-31T10:10:26.535Z",
                org_id: "3c4054dc-1888-4af5-8af2-586cadeecf2b",
                therapy_name: "Therapy multi select",
                therapy_status: 1,
                updated_date: "2023-08-31T10:10:26.535Z",
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                user_type: "admin",
                __typename: "TherapyData",
              },
            ],
            updated_date: "2023-09-11T09:05:28.705Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            model_status: 1,
            __typename: "ModelList",
          },

          {
            _id: "2c2b4616-4528-498e-a125-974b0398ddc8",
            created_date: "2023-09-01T07:45:01.036Z",
            disorder_detail: [
              {
                _id: "83551da1033a49c3a9d9b0322c6f13de",
                created_date: "2023-07-12T06:29:19.000Z",
                disorder_name: "Add disorder 12 july",
                disorder_status: 1,
                therapy_id: "2952d449bf0f42969ae7bf0e44f6124b",
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                user_type: "admin",
                __typename: "Disorder",
              },
            ],
            disorder_id: "83551da1033a49c3a9d9b0322c6f13de",
            model_name: "mvj",
            therapy_detail: [
              {
                _id: "2952d449bf0f42969ae7bf0e44f6124b",
                created_date: "2023-06-28T07:03:41.000Z",
                org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                therapy_name: "Mytherapy",
                therapy_status: 1,
                updated_date: null,
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                user_type: "admin",
                __typename: "TherapyData",
              },
            ],
            updated_date: "2023-09-01T07:45:01.036Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            model_status: 1,
            __typename: "ModelList",
          },
        ],
        __typename: "AdminModelList",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_MODAL,
    variables: {
      model_id: "5806b8eb-4386-4594-8b9b-bc241871f720",
      update_model: {
        model_name: "name therapy updated",
        disorder_id: undefined,
      },
    },
  },
  result: {
    data: {
      adminUpdateModel: {
        message: "Agenda edited Successfully",
        result: true,
        __typename: "result",
      },
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
          screen.getByText("Model added successfully!")
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

  it("submit edit modal form with valid data", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "iconButton_edit_5806b8eb-4386-4594-8b9b-bc241871f720"
        )
      ).toBeInTheDocument();
      fireEvent.click(
        screen.queryByTestId(
          "iconButton_edit_5806b8eb-4386-4594-8b9b-bc241871f720"
        )
      );
    });

    await waitFor(async () => {
      expect(screen.getByTestId("therapy_name")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("therapy_name"), {
        target: { value: "name therapy updated" },
      });
    });

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addSubmitForm"));
    });
    await waitFor(async () => {
      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Modal updated successfully!")
      ).toBeInTheDocument();
    });
  });
});
