import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { ADMIN_ADD_MODAL } from "../graphql/assessment/graphql";
import theme from "../styles/theme/theme";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";
import ModalListPage from "../components/admin/therapiesPages/modal";
import { GET_DISORDER_DATA_BY_ORG_ID } from "../graphql/query/common";

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

describe("Admin modal list", () => {
  it("Add modal", async () => {
    await sut();

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
});
