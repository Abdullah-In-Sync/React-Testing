import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { GET_UPLOAD_LOGO_URL } from "../graphql/query/resource";
import * as s3 from "../lib/helpers/s3";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import EditOrganization from "../pages/admin/organization/edit/[id]/index";
import { GET_ORGANIZATION_DETAIL_BY_ID } from "../graphql/query/organization";
import {
  GET_DISORDER_LIST_BY_THERAPY_ID,
  GET_MODLE_DISORDER_LIST_BY_DISORDER_ID,
  GET_THERAPIST_LIST_BY_ORG_ID,
  UPDATE_ORG_BY_ID,
} from "../graphql/mutation/admin";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

const file = new File(["hello"], "hello.png", { type: "image/png" });

//ORGNIZATION DETAIL
mocksData.push({
  request: {
    query: GET_ORGANIZATION_DETAIL_BY_ID,
    variables: { orgId: "42a4964a-5ca6-4d18-9171-4a34d729e3d2" },
  },
  result: {
    data: {
      viewOrganizationById: {
        _id: "42a4964a-5ca6-4d18-9171-4a34d729e3d2",
        contract: "<p>Contract</p>",
        created_date: "2023-01-13T06:58:55.104Z",
        logo: "invalid.jpg",
        logo_url:
          "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/images/invalid.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJATVDP76OT%2F20230113%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230113T075134Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHgaCWV1LXdlc3QtMSJHMEUCIBiO3wnarGROYNrAFVBKbtX5JFLKp7jxVu5YbUTXJpFVAiEAmTG9FAvYG5%2FjMTUT9ZOvf8UhjW058hwlsi74SuloY7wq8wII0f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDGOzWasaKrgXyXGpfirHArXRXjhBgFp9K%2BdslzN1xsCXzZrczHiQN7W6lbhUqiuceZ44t%2B7M6uJkjD6%2F7VYsdAlAPuALkMSstYDyUC6%2Fmd7dE0LZVg2Vr9Hp%2FVb%2B8ksZqzcO85avc9QjheTOQ3D9FPYEUXdjKo1tZN9ljPMm%2Fxz2n%2FCiCKfXr0x336pFvhXecwGf4mBlQusV7pKP%2FmIJFvGJllev%2FNRgik8G9no1yv%2F1Jg%2B1ZMU6Ms9iZRyxJXTblimwJjmGIWiGwB0srU%2F%2Fk3T2XaXhmCGLARW9KsyEztzb0tzxBlq%2BeHA31Hor5dOSODP4Rf3j8BaueR59A9%2FfYguKWo8ezCvgGhYKEax7RSMsrLcVftDmZ3SCdE64KJECHiS%2Fc%2FWn31f%2FidkJyVP2fgfiFRt9hj%2B9hTyN1nfLb7uTQwqK8SR9BijG6cUa8vQnbUmvpXRIpjCFm4SeBjqeAWePsrgI5NfK2RxAjHvCIwK%2FYT3nsBdlEMv%2Bam2IG6jb549uLPy%2Fn3DpdUp1ke22U3Bk3bzZcUbLP6UT6d%2BE5b48ELfyHFGadIWnYYAV1Vqq63UTkqV737bVSGOjNUJaPwzZqf43x7QEXw%2F4BEESmJ0Q6BFPf4%2FIMOzqQvOmNwEO1mC5uY3VZZRPZE7QuOMd79Z6mSQaWWAgeUaIMkMS&X-Amz-Signature=cac3dbe5739dc0f83fa3e13cc748236a4219f9135365f1433f11155814eef25f&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3Dinvalid.jpg&x-id=GetObject",
        name: "With file test",
        panel_color: "A",
        patient: "A",
        patient_plural: "A",
        patient_welcome_email: "<p>Email</p>",
        side_menu_color: "A",
        therapist: "A",
        therapy: "A",
        therapy_id: "dcf9b080dce34879a54208d0ecfdc168",
        disorder_id: "59c60ab89afb4923b09e242fc3f99f97",
        model_id: "ade64d00d726478aaee1e59b09c129ba",
      },
    },
  },
});
// upload file, presigned URL
mocksData.push({
  request: {
    query: GET_UPLOAD_LOGO_URL,
    variables: {
      fileName: "invalid.pdf",
      imageFolder: "images",
    },
  },
  result: {
    data: {
      getFileUploadUrl: {
        upload_file_url:
          "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/images/invalid.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAVM5ZG3HA%2F20230111%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230111T045239Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCWV1LXdlc3QtMSJHMEUCIE7dk8MXHXt0s1zS9mYyI5FcRfTXndZIQnhWiveBOj04AiEA2tuDh0m1WxJtgG1Lp%2BwEdWqv3DR9zH5FN%2BLcdIGiU4oq7QIInv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDNFvVJ6v7acLMUp06CrBAqbjqQjc3Ti5Fd%2BkGz4wWVtyljkgqXnF1SdsDYT8AQ55P5kOJCjBmxzIYkliSUpwWJCQg37tS2YPyWHIlcTpApSzEdBTBHurASbVWItO3TvS7xWvc4Bvrz21Bte6TTHkHH3oJCmENxt%2B%2Fxa2NXstHRY74F32Rvm6H7nAViH7f9DpBSIuMzqQpAFeIMJKR2he%2BpFNmmYRV8ZUVHlrjo0Eq%2BymMRvlhC1PqZ358XiPKPGgkTokXRP%2Bnf%2B02niRNkKWhrSxth3oPlQ0TSEkPADJM3h7n80VeJ8O1wQInzwqwOI30H6Sv%2FjTmY2uEoCn9M4O51otmYsEiKrFGX9IlK4rmzuZgY%2FnqBAwCdAGfK8Ucml56W6vjZCrr%2FBeKdewATCyoyNrLLqkhOs0IHh%2BBWJEN2y%2FIGIsUOE2aO6FGGb6ql%2B7BjDsgPmdBjqeAQNgttAYGLvuTXfcginssgtpPrARYnBnNfLZzzBCIkjUdZGV9TqthZ8eEqz2krJvjcIe%2FVQLT26ICrfPtjJlQEmHA7Hj6bj4wDe9DgFf72aro8QRiATIn6LrCIDK8IIbluqiUiaAEE6r6wScMl1ibVtcAWt42FgA%2BgVtxzxZNN2IX4wKpgZBh3n8xx5zU%2Bi2BJdmBA9wGp3BQ3dCOkTG&X-Amz-Signature=d97a40cd5264c661ab74dd09b6f2f6f2c8c8f945fdd6a85f9035d9c869569d1a&X-Amz-SignedHeaders=host&x-id=PutObject",
        __typename: "uploadFileUrl",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_ORG_BY_ID,
    variables: {
      orgId: "81babae7-bcf1-448a-b5b7-061a2fec04e7",
      update: {
        name: "Name Edited1",
        panel_color: "Panel Color Edited",
        side_menu_color: "Side Color Edite",
        therapist: "Therapist",
        patient: "",
        patient_plural: "Plural",
        therapy: "Therapy",
        contract:
          "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
        patient_welcome_email:
          "<p>Welcome to MyHelp</p><p>Your details have been given by [THERAPIST_NAME] to provide you access with the MyHelp platform. The platform will support your therapy allowing you to share information between yourself and your therapist. We have created the MyHelp platform to support both therapist&#x27;s and patients in their pursuit of a smoother therapy process.</p><p>MyHelp empowers therapist&#x27;s throughout the entire process and delivers personalised care with the aim to improve patient outcomes. Simultaneously, patients can access their own platform to access key information to support their progress and communicate more efficiently with their therapist. We believe the MyHelp platform will enhance the therapeutic relationship in order to deliver better results. In order to access your private area of the MyHelp platform you will need to:</p><p>Visit the website: https://portal.dev-myhelp.co.uk/</p><p>Enter the access details: Username – your email address, Password – Happ1ness</p><p>We recommend that you change your password by clicking the icon in the right hand corner to something personal and more memorable.</p><p>Now you have access to your personal therapy guide, which will be developed with the support of your therapist over the period of your therapy This will allow you to access the information and resources now and in the future.</p><p>If you have any other questions then please email info@myhelp.co.uk and we will endeavor to get back to you within 24 hours.</p><p>Thank you,</p><p>MyHelp Team.</p><p>P.S. Need help getting started? Please have a look at our help documentation or just reply to this email with any questions or issues you may have. The MyHelp support team is available to help with the platform only. Unfortunately, we do not provide mental health services and cannot support you in this respect. Please contact your therapist in such cases.</p>",
        logo: "test.pdf",
        model_id: "",
        therapy_id: "",
        disorder_id: "",
      },
    },
  },
  result: {
    data: {
      updateOrgById: {
        _id: "81babae7-bcf1-448a-b5b7-061a2fec04e7",
        contract: "<p>Contract 123</p>",
        created_date: "2023-01-13T10:15:28.349Z",
        logo: "invalid.jpg",
        logo_url: null,
        name: "Name Edited1",
        panel_color: "Panel Color Edited",
        patient: "Patient",
        patient_plural: "Plural",
        patient_welcome_email: "<p>Email 123</p>",
        side_menu_color: "Side Color Edited",
        therapist: "Therapist",
        therapy: "Therapy",
        __typename: "Organization",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_LIST_BY_ORG_ID,
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
    query: GET_DISORDER_LIST_BY_THERAPY_ID,
    variables: {
      therapyId: "dcf9b080dce34879a54208d0ecfdc168",
    },
  },
  result: {
    data: {
      getDisorderByTherapyId: [
        {
          _id: "59c60ab89afb4923b09e242fc3f99f97",
          created_date: "2022-10-28T08:58:40.000Z",
          disorder_name: "rest-order",
          disorder_status: 1,
          therapy_detail: null,
          therapy_id: "dcf9b080dce34879a54208d0ecfdc168",
          updated_date: null,
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "DisorderData",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_MODLE_DISORDER_LIST_BY_DISORDER_ID,
    variables: {
      disorderId: "59c60ab89afb4923b09e242fc3f99f97",
    },
  },
  result: {
    data: {
      getModelDisorderList: [
        {
          _id: "ade64d00d726478aaee1e59b09c129ba",
          created_date: "2022-10-28T08:58:57.000Z",
          disorder_id: "59c60ab89afb4923b09e242fc3f99f97",
          model_name: "rest-model",
          model_status: 1,
          updated_date: null,
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "DisorderModelData",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <EditOrganization />
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

  it("should render complete edit resource form", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "42a4964a-5ca6-4d18-9171-4a34d729e3d2",
      },
    }));
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("organization-add-form")).toBeInTheDocument();

      expect(screen.getByTestId("name")).toHaveValue("With file test");

      expect(screen.getByTestId("panel_color")).toHaveValue("A");

      expect(screen.getByTestId("side_menu_color")).toHaveValue("A");

      expect(screen.getByTestId("patient")).toHaveValue("A");

      expect(screen.getByTestId("therapist")).toHaveValue("A");

      expect(screen.getByTestId("patient_plural")).toHaveValue("A");

      expect(screen.getByTestId("therapy")).toHaveValue("A");

      expect(screen.getByTestId("therapy_id")).toHaveValue(
        "dcf9b080dce34879a54208d0ecfdc168"
      );

      expect(screen.getByTestId("disorder_id")).toHaveValue(
        "59c60ab89afb4923b09e242fc3f99f97"
      );

      expect(screen.getByTestId("model_id")).toHaveValue(
        "ade64d00d726478aaee1e59b09c129ba"
      );

      expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();
      expect(screen.getByTestId("edit-upload-file")).toBeInTheDocument();

      expect(screen.getByTestId("edit-upload-file").textContent).toEqual(
        "invalid.jpg"
      );

      expect(
        screen.getByTestId("addOrganizationSubmitButton")
      ).toBeInTheDocument();
    });
  });

  it("submit edit form with file", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "81babae7-bcf1-448a-b5b7-061a2fec04e7",
      },
      push: pushMock,
    });

    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "test.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    await sut();
    fireEvent.change(screen.queryByTestId("name"), {
      target: { value: "Name Edited1" },
    });
    fireEvent.change(screen.queryByTestId("panel_color"), {
      target: { value: "Panel Color Edited" },
    });
    fireEvent.change(screen.queryByTestId("side_menu_color"), {
      target: { value: "Side Color Edite" },
    });
    fireEvent.change(screen.queryByTestId("therapy"), {
      target: { value: "Therapy" },
    });

    fireEvent.change(screen.queryByTestId("patient_plural"), {
      target: { value: "Plural" },
    });

    fireEvent.change(screen.queryByTestId("therapist"), {
      target: { value: "Therapist" },
    });

    fireEvent.change(screen.getByTestId("resource_file_upload"), {
      target: { files: [file] },
    });

    await waitFor(async () => {
      fireEvent.submit(screen.queryByTestId("addOrganizationSubmitButton"));
    });

    expect(screen.queryByTestId("sureModal")).toBeInTheDocument();

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addOrganizationConfirmButton"));
    });

    await waitFor(async () => {
      expect(screen.queryByTestId("SuccessOkBtn")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Organisation Updated Successfully")
      ).toBeInTheDocument();
    });

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("SuccessOkBtn"));
    });

    expect(pushMock).toHaveBeenCalledWith("/admin/organization/list");
  });
});
