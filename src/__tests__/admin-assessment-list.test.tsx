import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import {
  ADMIN_CREATE_ASSESSMENT,
  ADMIN_DELETE_AND_UPDATE_ASSESSMENT,
  GET_ADMIN_ASSESSMENT_DATA_BY_ID,
  GET_ADMIN_ASSESSMENT_LIST,
} from "../graphql/assessment/graphql";
import theme from "../styles/theme/theme";
import AssessmentListPage from "../pages/admin/assessment";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";

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
    query: GET_ADMIN_ASSESSMENT_LIST,
    variables: { limit: 10, pageNo: 1, searchText: "" },
  },
  result: {
    data: {
      adminAssessmentList: {
        data: [
          {
            _id: "5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d",
            created_date: "2023-05-18T16:13:22.678Z",
            name: "test assessment",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            organization_name: "actions.dev-myhelp",
            status: 1,
            updated_date: "2023-05-18T16:13:22.678Z",
            __typename: "AdminAssessment",
          },
          {
            _id: "3e863ee6-be44-4dcb-86ea-7141b91333eb",
            created_date: "2023-06-08T05:47:21.372Z",
            name: "Final test All",
            org_id: "b121273b-f0a9-4c24-89d2-796439923543",
            organization_name: "Name",
            status: 1,
            updated_date: "2023-06-08T05:47:21.372Z",
            __typename: "AdminAssessment",
          },
        ],
        total: 2,
        __typename: "adminAssessments",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_DELETE_AND_UPDATE_ASSESSMENT,
    variables: {
      assessment_id: "5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d",
      update: {
        name: "test assessment",
        org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
        status: 0,
      },
    },
  },
  result: {
    data: {
      adminUpdateAssessment: {
        _id: "8f761767-0674-43be-b59d-a0207782b7e3",
        category: null,
        created_date: "2023-06-08T05:47:22.260Z",
        org_id: "65a7ffb0-3c45-47ea-91bb-89e36ea5fe6f",
        name: "Final test All",
        status: 0,
        updated_date: "2023-06-08T11:43:42.134Z",
        __typename: "adminViewAssessment",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_CREATE_ASSESSMENT,
    variables: { name: "Namelkmsllvslm", org_id: undefined },
  },
  result: {
    data: {
      adminCreateAssessment: {
        duplicateNames: null,
        result: true,
        __typename: "adminResult",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_ASSESSMENT_DATA_BY_ID,
    variables: { assessment_id: "5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d" },
  },
  result: {
    data: {
      adminViewAssessment: {
        _id: "58b6e46b-01ec-4d2e-a874-0d03baec3262",
        category: [],
        created_date: "2023-06-09T05:53:45.902Z",
        name: "re create updated",
        org_id: "2301536c4d674b3598814174d8f19593",
        status: 1,
        updated_date: "2023-06-09T06:05:18.175Z",
        __typename: "adminViewAssessment",
      },
    },
  },
});

// Re using api for edit assessent
mocksData.push({
  request: {
    query: ADMIN_DELETE_AND_UPDATE_ASSESSMENT,
    variables: {
      assessment_id: "5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d",
      update: {
        name: "Update the name and submit",
        org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
        status: 1,
      },
    },
  },
  result: {
    data: {
      adminUpdateAssessment: {
        _id: "8f761767-0674-43be-b59d-a0207782b7e3",
        category: null,
        created_date: "2023-06-08T05:47:22.260Z",
        org_id: "65a7ffb0-3c45-47ea-91bb-89e36ea5fe6f",
        name: "Final test All",
        status: 0,
        updated_date: "2023-06-08T11:43:42.134Z",
        __typename: "adminViewAssessment",
      },
    },
  },
});
const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AssessmentListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin Assessment list", () => {
  it("Assessment list", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByText("Name of Assessment")).toBeInTheDocument();
      expect(screen.getByText("test assessment")).toBeInTheDocument();
    });
  });
  it("Creat assessment", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("createPlanButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("createPlanButton"));

      expect(screen.getByText("Create assessment")).toBeInTheDocument();
      expect(screen.getByTestId("patient_firstname")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("patient_firstname"), {
        target: { value: "Namelkmsllvslm" },
      });

      const selectElement = screen.getByTestId(
        "select_organisation1"
      ) as HTMLSelectElement;
      expect(screen.getByTestId("select_organisation1")).toBeInTheDocument();

      fireEvent.change(selectElement, { target: { selectedIndex: 1 } });
      expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("addSubmitForm"));

      await waitFor(async () => {
        expect(
          screen.getByText("Are you sure you want to create the assessment?")
        ).toBeInTheDocument();
      });

      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(
        screen.getByText("Assessment created successfully!")
      ).toBeInTheDocument();
    });
  });

  it("delete assessment from list", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "iconButton_delete_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
        )
      ).toBeInTheDocument();

      fireEvent.click(
        screen.queryByTestId(
          "iconButton_delete_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
        )
      );

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Assessment deleted sucessfully!")
        ).toBeInTheDocument();
      });
    });
  });

  it("Creat assessment", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("createPlanButton")).toBeInTheDocument();
      expect(
        screen.getByTestId(
          "iconButton_edit_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
        )
      ).toBeInTheDocument();

      fireEvent.click(
        screen.queryByTestId(
          "iconButton_edit_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
        )
      );

      expect(screen.getByTestId("patient_firstname")).toBeInTheDocument();

      await waitFor(async () => {
        // expect(screen.getByTestId("patient_firstname")).toBeInTheDocument();
        expect(screen.getByTestId("patient_firstname")).toHaveValue(
          "re create updated"
        );

        fireEvent.change(screen.queryByTestId("patient_firstname"), {
          target: { value: "Update the name and submit" },
        });
      });

      // fireEvent.change(screen.queryByTestId("patient_firstname"), {
      //   target: { value: "Namelkmsllvslm" },
      // });

      expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("addSubmitForm"));

      await waitFor(async () => {
        expect(
          screen.getByText("Are you sure you want to update the assessment?")
        ).toBeInTheDocument();
      });

      fireEvent.click(screen.queryByTestId("confirmButton"));

      await waitFor(async () => {
        expect(
          screen.getByText("Assessment edit sucessfully!")
        ).toBeInTheDocument();
      });
    });
  });
});
