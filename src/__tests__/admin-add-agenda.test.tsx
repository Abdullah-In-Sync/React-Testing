import {
  screen,
  render,
  fireEvent,
  waitFor,
  within,
  act,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import {
  GET_MODEL_BY_DISORDERID_DATA,
  GET_DISORDER_DATA_BY_ORG_ID,
} from "../graphql/query/common";
import { useRouter } from "next/router";
import { ADD_AGENDA } from "../graphql/mutation/resource";
import { useAppContext } from "../contexts/AuthContext";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme/theme";
import AddAdminAgendaMain from "../pages/admin/agenda/add";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";
import { GET_THERAPIST_LIST_BY_ORG_ID } from "../graphql/mutation/admin";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

// mocks
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
    query: GET_THERAPIST_LIST_BY_ORG_ID,
    variables: { orgId: "d1f2bbd3-3388-4ca2-9d68-55b95574a269" },
  },
  result: {
    data: {
      getTherapyListByOrgId: [
        {
          _id: "dcf9b080dce34879a54208d0ecfdc168",
          created_date: "2022-10-28T08:58:24.000Z",
          org_id: "2301536c4d674b3598814174d8f19593",
          therapy_name: "rest therapy",
          therapy_status: 1,
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
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

// model
mocksData.push({
  request: {
    query: GET_MODEL_BY_DISORDERID_DATA,
    variables: {
      disorderId: "disorder_id_1",
    },
  },
  result: {
    data: {
      getModelByDisorderId: [
        {
          _id: "model_id_1",
          model_name: "model_id_1",
        },
        {
          _id: "model_id_2",
          model_name: "model_id_2",
        },
      ],
    },
  },
});

// add formulation
mocksData.push({
  request: {
    query: ADD_AGENDA,
    variables: {
      agenda_name: "name therapy",
      disorder_id: "disorder_id_1",
      display_order: "1",
      model_id: "model_id_1",
      session: "1",
      therapy_id: "dcf9b080dce34879a54208d0ecfdc168",
    },
  },
  result: {
    data: {
      createAdminAgenda: {
        message: "Agenda Added Successfully",
        result: true,
        __typename: "result",
      },
    },
  },
});

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
          <AddAdminAgendaMain />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin add resource page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });

  it("submit form with valid data", async () => {
    await sut();

    expect(screen.getByTestId("agenda_name")).toBeInTheDocument();

    await waitFor(async () => {
      fireEvent.change(screen.queryByTestId("agenda_name"), {
        target: { value: "name therapy" },
      });

      fireEvent.change(screen.queryByTestId("display_order"), {
        target: { value: 1 },
      });

      fireEvent.change(screen.queryByTestId("select_organisation1"), {
        target: { value: "d1f2bbd3-3388-4ca2-9d68-55b95574a269" },
      });

      await expect(
        screen.queryByTestId("select_organisation1").getAttribute("value")
      ).toBe("d1f2bbd3-3388-4ca2-9d68-55b95574a269");
    });

    await waitFor(async () => {
      fireEvent.change(screen.queryByTestId("therapy_id"), {
        target: { value: "dcf9b080dce34879a54208d0ecfdc168" },
      });

      await expect(
        screen.queryByTestId("therapy_id").getAttribute("value")
      ).toBe("dcf9b080dce34879a54208d0ecfdc168");
    });

    await waitFor(async () => {
      fireEvent.change(screen.queryByTestId("disorder_id"), {
        target: { value: "disorder_id_1" },
      });

      await expect(
        screen.queryByTestId("disorder_id").getAttribute("value")
      ).toBe("disorder_id_1");
    });

    await waitFor(async () => {
      fireEvent.change(screen.queryByTestId("model_id"), {
        target: { value: "model_id_1" },
      });

      await expect(screen.queryByTestId("model_id").getAttribute("value")).toBe(
        "model_id_1"
      );
    });

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addResourceSubmitButton"));
    });
    await waitFor(async () => {
      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));
    });

    // await waitFor(async () => {
    //   expect(
    //     screen.getByText("Agenda added successfully!")
    //   ).toBeInTheDocument();
    // });

    // expect(mockRouter.push).toHaveBeenCalledWith("/admin/agenda");
  });
});
