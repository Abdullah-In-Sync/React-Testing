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
  ADMIN_CREATE_ASSESSMENT,
  ADMIN_DELETE_AND_UPDATE_ASSESSMENT,
  ADMIN_SHARE_ASSESSMENT,
  GET_ADMIN_ASSESSMENT_DATA_BY_ID,
  GET_ADMIN_ASSESSMENT_LIST,
  GET_ORGANISATION_SHARED_LIST,
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
    variables: {
      name: "Namelkmsllvslm",
      org_id: "2301536c4d674b3598814174d8f19593",
    },
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

//for assessment share
mocksData.push({
  request: {
    query: GET_ORGANISATION_SHARED_LIST,
    variables: {
      name: "test assessment",
      share_type: "assessment",
    },
  },
  result: {
    data: {
      getOrganisationSharedList: [
        {
          _id: "4b82eac1-6e57-4666-bce3-3b358a7f5ed1",
          is_shared: false,
          name: "A",
          __typename: "ShareOrganization",
        },
        {
          _id: "df139464-0f74-4532-a489-c87e5b64144e",
          is_shared: true,
          name: "Add org editedkdjnsk",
          __typename: "ShareOrganization",
        },
        {
          _id: "22e18602-147d-499e-85fd-8b265e412411",
          is_shared: true,
          name: "Add refactor 1",
          __typename: "ShareOrganization",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_SHARE_ASSESSMENT,
    variables: {
      assessment_id: "5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d",
      org_id: "4b82eac1-6e57-4666-bce3-3b358a7f5ed1",
    },
  },
  result: {
    data: {
      adminShareAssessment: {
        duplicateNames: null,
        result: true,
        __typename: "adminResult",
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

export const checkSelected = async (element: HTMLElement, id: string) => {
  const button = await within(element).findByRole("button");
  expect(button).toBeInTheDocument();
  await act(async () => {
    fireEvent.mouseDown(button);
  });
  const listBox = await screen.findByRole("listbox");
  expect(listBox).toBeInTheDocument();
  const selectOption = await screen.findByTestId(`shareOrg_${id}`);
  expect(selectOption).toBeInTheDocument();
  fireEvent.click(selectOption);
  const hideEle = await screen.findAllByRole("presentation");
  hideEle[0].style.display = "none";
  // expect(listBox).toBeUndefined();
};

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
    fireEvent.click(await screen.findByTestId("createPlanButton"));
    fireEvent.change(await screen.getByTestId("assessment_name"), {
      target: { value: "Namelkmsllvslm" },
    });
    const select = await screen.findByTestId("mainOrganizationSelect");
    await checkSelected(select, "2301536c4d674b3598814174d8f19593");
    fireEvent.click(await screen.findByTestId("addSubmitForm"));
    expect(
      await screen.findByText("Are you sure you want to create the assessment?")
    ).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText("Assessment created successfully!")
    ).toBeInTheDocument();
  });

  it("delete assessment from list", async () => {
    await sut();
    expect(
      await screen.findByTestId(
        "iconButton_delete_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
      )
    ).toBeInTheDocument();
    fireEvent.click(
      await screen.findByTestId(
        "iconButton_delete_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
      )
    );
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText("Assessment deleted sucessfully!")
    ).toBeInTheDocument();
  });

  it("Update assessment", async () => {
    await sut();
    fireEvent.click(
      await screen.findByTestId(
        "iconButton_edit_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
      )
    );
    fireEvent.change(await screen.findByTestId("patient_firstname"), {
      target: { value: "Update the name and submit" },
    });
    fireEvent.click(await screen.findByTestId("addSubmitForm"));
    expect(
      await screen.findByText("Are you sure you want to update the assessment?")
    ).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText("Assessment updated successfully!")
    ).toBeInTheDocument();
  });

  it("Share assessment from list", async () => {
    await sut();
    const shareBtn = await screen.findByTestId(
      "iconButton_share_5fb6dc4d-402c-4934-bd27-bdca0dfa0d6d"
    );
    expect(shareBtn).toBeInTheDocument();
    fireEvent.click(shareBtn);
    const saveBtn = await screen.findByTestId("addSubmitForm");
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    expect(
      screen.getByText("Organisation cannot be empty")
    ).toBeInTheDocument();

    const select = await screen.findByTestId("share_organisation_select_list");
    expect(select).toBeInTheDocument();
    await clickSelect(select);

    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    await waitFor(async () => {
      expect(
        screen.getByText("Are you sure you want to share the assessment?")
      ).toBeInTheDocument();
    });
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("confirmButton"));
    await waitFor(async () => {
      expect(
        screen.getByText("Assessment shared successfully!")
      ).toBeInTheDocument();
    });
  });
});
