import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import {
  ADMIN_ADD_THERAPY,
  ADMIN_DELETE_THERAPY,
  GET_ADMIN_THERAPIES_LIST,
} from "../graphql/assessment/graphql";
import theme from "../styles/theme/theme";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";
import TherapiesListPage from "../components/admin/therapiesPages/therapy";

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
    query: GET_ADMIN_THERAPIES_LIST,
    variables: { limit: 10, pageNo: 1, therapy_name: "" },
  },
  result: {
    data: {
      adminTherapyList: {
        data: [
          {
            _id: "18a00bdb-a27d-40c5-a858-e6047444636b",
            created_date: "2023-08-02T14:09:14.808Z",
            org_id: "72b6b276ee55481682cb9bf246294faa",
            organization_name: "arti real",
            therapy_status: 1,
            therapy_name: "appsync",
            updated_date: "2023-08-02T14:09:14.808Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          // {
          //   _id: "56d0437d002648ffadf54d0a0b71ab81",
          //   created_date: "2023-07-28T06:12:22.000Z",
          //   org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          //   organization_name: "portal.dev-myhelp",
          //   therapy_status: 1,
          //   therapy_name: "Therapy Model disorder Category Edit",
          //   updated_date: "2023-07-28T06:19:43.000Z",
          //   user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          //   user_type: "admin",
          //   __typename: "Therapy",
          // },
        ],
        total: 17,
        __typename: "adminTherapy",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_ADD_THERAPY,
    variables: { therapy_name: "Namelkmsllvslm", org_id: "" },
  },
  result: {
    data: {
      adminAddTherapy: {
        message: "Therapy added successfully",
        result: true,
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_DELETE_THERAPY,
    variables: {
      therapy_id: "18a00bdb-a27d-40c5-a858-e6047444636b",
      update: { therapy_status: 0 },
    },
  },
  result: {
    data: {
      adminUpdateTherapy: {
        _id: "260e1216-1fb6-491c-a026-1f56043cb018",
        created_date: "2023-08-23T08:35:23.566Z",
        org_id: "[6a023824f3264894864fce5aded2311d",
        organization_name: null,
        therapy_name: "sdc,",
        therapy_status: 0,
        updated_date: "2023-08-23T11:04:32.867Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        __typename: "Therapy",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_DELETE_THERAPY,
    variables: {
      therapy_id: "18a00bdb-a27d-40c5-a858-e6047444636b",
      update: { therapy_name: "Update the name and submit" },
    },
  },
  result: {
    data: {
      adminUpdateTherapy: {
        _id: "260e1216-1fb6-491c-a026-1f56043cb018",
        created_date: "2023-08-23T08:35:23.566Z",
        org_id: "[6a023824f3264894864fce5aded2311d",
        organization_name: null,
        therapy_name: "sdc,",
        therapy_status: 0,
        updated_date: "2023-08-23T11:04:32.867Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        __typename: "Therapy",
      },
    },
  },
});

export const clickSelect = async (element: HTMLElement) => {
  const button = await within(element).findByRole("button");
  expect(button).toBeInTheDocument();
  await act(async () => {
    fireEvent.mouseDown(button);
  });
  const listBox = await screen.findByRole("listbox");
  expect(listBox).toBeInTheDocument();
  const selectOption = await screen.findByTestId(
    "shareOrg_4b82eac1-6e57-4666-bce3-3b358a7f5ed1"
  );
  expect(selectOption).toBeInTheDocument();
  fireEvent.click(selectOption);
};

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapiesListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin Therapies list", () => {
  it("Therapies list", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByText("arti real")).toBeInTheDocument();
    });
  });
  it("Add therapy", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("createPlanButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("createPlanButton"));

      expect(screen.getByTestId("therapy_name")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("therapy_name"), {
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
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });
      await waitFor(async () => {
        expect(
          screen.getByText("Therapy added successfully!")
        ).toBeInTheDocument();
      });
    });
  });

  it("delete therapy from list", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("DeleteSharpIcon")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("DeleteSharpIcon"));

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Therapy deleted successfully!")
        ).toBeInTheDocument();
      });
    });
  });

  it("Create assessment", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "iconButton_edit_18a00bdb-a27d-40c5-a858-e6047444636b"
        )
      ).toBeInTheDocument();

      fireEvent.click(
        screen.queryByTestId(
          "iconButton_edit_18a00bdb-a27d-40c5-a858-e6047444636b"
        )
      );

      await waitFor(async () => {
        fireEvent.change(screen.queryByTestId("therapy_name"), {
          target: { value: "Update the name and submit" },
        });
      });

      expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("addSubmitForm"));

      await waitFor(async () => {
        expect(
          screen.getByText("Are you sure you want to update the therapy?")
        ).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Therapy updated successfully!")
        ).toBeInTheDocument();
      });
    });
  });
});
