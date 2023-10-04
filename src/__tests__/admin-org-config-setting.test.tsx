import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import ConfigSetting from "../pages/admin/organization/config/[id]/index";
import {
  GET_ORGANIZATION_DETAIL_BY_ID,
  LIST_MODULE,
  LIST_MODULE_BY_ORG_ID,
} from "../graphql/query/organization";
import { UPDATE_ORG_CONFIG } from "../graphql/mutation/admin";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../contexts/AuthContext");
const pushMock = jest.fn();

const mocksData = [];

//ORGNIZATION DETAIL
mocksData.push({
  request: {
    query: GET_ORGANIZATION_DETAIL_BY_ID,
    variables: {
      orgId: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
    },
  },
  result: {
    data: {
      viewOrganizationById: {
        _id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
        contract: "<p>jn44</p>",
        created_date: "2023-01-13T09:53:47.764Z",
        logo: "lll",
        logo_url:
          "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/images/lll?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA2LGJU33Q%2F20230117%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230117T060907Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIQDfIwVAv7jgScx3ec1SS%2FsTKPPtaqfO8kNUPdMXFnMHygIgdMUFdqSVuOVGE4PFTpqHKvinRKmXHmKBsbx2C4%2BzWC0q6gIIPxABGgw2NzM5MjgyNTgxMTMiDEDSW%2B0QpUvQ0ejkBSrHAs7WqNJywYVmEFKetax%2Bb0IFwPrsr8GWQCr47%2FwxSv68scqKYHIP35MGhUKTOIvp%2Fh5fKHqLQeXA4umdTFiUSY%2B9mq%2FzWedoGkOKDGZT3kOtgOSp9uWhcaHPV9Si3RtjbaHXS5tFgbKVENlZ2qPTJhwB3pMqLcMHVEiDvHhDE2ve3l6aTzUj1IZUJXxcqXN9MIV94SkRbcp01UK4Wg%2FAWhzUFM6IxtxzkfjfWmzVyalnjmcoVU%2BxqNOxEQ65jhXX3CLnk4WGmmeHDIutwHDylUJ9Now4oTIASekaGIKVwULUqr2VBmR%2FMEsRs%2F7if1xuhdbu%2FiMpIIaoZuje5FgX6TwFbfFLNoe7M53rxpEcPO7Wu%2F6oLKVl%2FIO7fSdbs4n4E%2BGRKm6YdRHxueAdHT4ea%2BQs6G9u87DnXeM2oe%2F5YSqn%2B0v%2FOfvt3zD59pieBjqeAWO3dY4uDVUr%2F1O70qr2J2OWEYrU%2FbkzyV%2Bx73mVSGossOMFnUjy%2Be7%2BrLFrcOP7KR8EIMbx9cVvNfPPQ2lqZ05mqTNsLQ%2BF0Wv4tFHQH5fNKFYtWMVbD%2BIzogMkwWO7iW0kK7HdVhQ1ea0VlIgnHek37Q%2FISdAkHix%2BXwgWWtJZcfaJcnpJodwgMPgFK09eM4rD5ydUKGCt6SmAHknJ&X-Amz-Signature=bbb21135c56484b0c0064eb7ad46593dbcf7668609f35c99207816b1d87d84ff&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3Dlll&x-id=GetObject",
        name: "ll4",
        panel_color: "kmk4",
        patient: "lknl4",
        patient_plural: "ll4",
        patient_welcome_email: "<p>lml44</p>",
        side_menu_color: "lkmlm4",
        therapist: "lmlk4",
        therapy: "ll4",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_ORG_CONFIG,
    variables: {
      orgId: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
      moduleName: "CALENDAR,COMMUNICATION,PERSONAL_INFO,RELAPSE",
    },
  },
  result: {
    data: {
      updateOrgConfig: [
        {
          _id: "18d6c35d-3760-47e2-a2d0-800327b9cd86",
          name: "APPOINTMENT",
          org_id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
          status: 1,
          __typename: "ModuleData",
        },
        {
          _id: "b3dafd7e-aba1-4105-a83b-29e1f2de0428",
          name: "MY_PROFILE",
          org_id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
          status: 1,
          __typename: "ModuleData",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: LIST_MODULE,
  },
  result: {
    data: {
      listModules: [
        {
          _id: "1f7c7ee8bf584eeea5610662d07bfb83",
          name: "APPOINTMENT",
          __typename: "Modules",
        },
        {
          _id: "6f29688853c3467ba8985a638b76f5e8",
          name: "CALENDAR",
          __typename: "Modules",
        },
        {
          _id: "7983a835ade248fdad908264971f8851",
          name: "COMMUNICATION",
          __typename: "Modules",
        },
        {
          _id: "d6b28f3c91a54b7099571395c32ac2fd",
          name: "PERSONAL_INFO",
          __typename: "Modules",
        },
        {
          _id: "2a0d2f483acb401bba7f2d662cf5e304",
          name: "RELAPSE",
          __typename: "Modules",
        },
        {
          _id: "55afa0656f674f4784d88d952956c849",
          name: "MY_PROFILE",
          __typename: "Modules",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: LIST_MODULE_BY_ORG_ID,
    variables: {
      orgId: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
    },
  },
  result: {
    data: {
      listModulesByOrganization: [
        {
          org_id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
          status: 1,
          _id: "a8f063a7ac7f4b6f87028837bf408bbc",
          name: "PERSONAL_INFO",
          __typename: "ModuleData",
        },
        {
          org_id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
          status: 1,
          _id: "04824dbc5fb64875b32af2edf814bbec",
          name: "RELAPSE",
          __typename: "ModuleData",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <ConfigSetting />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Admin edit resource page", () => {
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

  it("should render dynamic org name", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
      },
    }));
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("config-setting-form")).toBeInTheDocument();

      expect(
        screen.getByText("ll4 Configurations - Settings")
      ).toBeInTheDocument();
    });
  });

  it("should render complete dynamic modules", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("config-setting-form")).toBeInTheDocument();
      expect(screen.getByText("APPOINTMENT")).toBeInTheDocument();
      expect(screen.getByText("CALENDAR")).toBeInTheDocument();

      expect(screen.getByText("COMMUNICATION")).toBeInTheDocument();

      expect(screen.getByText("PERSONAL_INFO")).toBeInTheDocument();

      expect(screen.getByText("RELAPSE")).toBeInTheDocument();

      expect(screen.getByText("MY_PROFILE")).toBeInTheDocument();
    });
  });

  it("Render toggled button data", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
      },
    });

    await sut();

    expect(screen.getByTestId("config-setting-form")).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByText("PERSONAL_INFO")).toBeInTheDocument();
      expect(screen.getByText("RELAPSE")).toBeInTheDocument();
    });
  });

  it("By clicking on the toggle button and update the data", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "4cc38ec8-78d7-44cb-b668-3c81cc3e7dee",
      },
      push: pushMock,
    });

    await sut();

    expect(screen.getByTestId("config-setting-form")).toBeInTheDocument();
    await waitFor(async () => {
      expect(screen.getByTestId("modules-switch-button1")).toBeInTheDocument();
      expect(screen.getByTestId("modules-switch-button2")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("modules-switch-button1"));
      fireEvent.click(screen.queryByTestId("modules-switch-button2"));

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("addOrganizationSubmitButton"));
      });
      expect(screen.queryByTestId("sureModal")).toBeInTheDocument();

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("addOrganizationConfirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Configuration Saved Successfully")
        ).toBeInTheDocument();
      });

      // expect(mockRouter.push).toHaveBeenCalledWith("/admin/organization/list");
      expect(pushMock).toHaveBeenCalledWith("/admin/organization/list");
    });
  });
});
