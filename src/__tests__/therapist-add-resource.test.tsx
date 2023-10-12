import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import AddResource from "../pages/therapist/resource/add";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA_BY_ORG_ID,
  GET_MODEL_BY_DISORDERID_DATA,
  GET_THERAPIST_TOKEN_DATA,
} from "../graphql/query/common";
import {
  GET_UPLOAD_LOGO_URL,
  GET_UPLOAD_RESOURCE_URL,
} from "../graphql/query/resource";
import {
  CREATE_RESOURCE,
  CREATE_RESOURCE_FORMULATION,
} from "../graphql/mutation/resource";

import { useAppContext } from "../contexts/AuthContext";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme/theme";

import * as s3 from "../lib/helpers/s3";

import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

// mocks
const mocksData = [];
mocksData.push({
  request: {
    query: GET_THERAPIST_TOKEN_DATA,
    variables: {},
  },
  result: {
    data: {
      getTokenData: {
        _id: "some-therapist-id",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "myhelp",
        },
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_DISORDER_DATA_BY_ORG_ID,
    variables: {
      orgId: "myhelp",
    },
  },
  result: {
    data: {
      getDisorderByOrgId: [
        {
          _id: "disorder_id_1",
          user_type: "therapist",
          disorder_name: "disorder 1",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_UPLOAD_RESOURCE_URL,
    variables: { fileName: "invalid.pdf" },
  },
  result: {
    data: {
      getUploadResourceUrl: {
        resource_upload: "dummy_upload_url",
      },
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
// category
mocksData.push({
  request: {
    query: GET_CATEGORY_BY_MODELID_DATA,
    variables: {
      modelId: "model_id_1",
    },
  },
  result: {
    data: {
      getCategoryByModelId: [
        {
          _id: "category_id_1",
          category_name: "category_id_1",
        },
      ],
    },
  },
});
// agenda
mocksData.push({
  request: {
    query: GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
    variables: {
      disorderId: "disorder_id_1",
      modelId: "model_id_1",
    },
  },
  result: {
    data: {
      getAgendaByDisorderAndModel: [
        {
          _id: "agenda_id_1",
          agenda_name: "agenda_id_1",
        },
      ],
    },
  },
});
// upload file, presigned URL
const file = new File(["hello"], "hello.png", { type: "image/png" });
jest
  .spyOn(s3, "strippedBlob")
  .mockImplementation((_, callback) => callback(file));
// token data

mocksData.push({
  request: {
    query: GET_UPLOAD_LOGO_URL,
    variables: {
      fileName: "invalid.pdf",
      imageFolder: "formulation",
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

// add resource
mocksData.push({
  request: {
    query: CREATE_RESOURCE,
    variables: {
      disorderId: "disorder_id_1",
      modelId: "model_id_1",
      resourceAvailOnlyme: 0,
      resourceAvailTherapist: 1,
      resourceFilename: "invalid.pdf",
      resourceName: "test",
      resourceType: 0,
      agendaId: "agenda_id_1",
      categoryId: "category_id_1",
      resourceDesc: "",
      resourceInstruction: "",
      resourceIsformualation: "0",
      resourceIssmartdraw: "0",
      resourceReferences: "",
      templateData: "",
      templateId: "",
      orgId: "myhelp",
    },
  },
  result: {
    data: {
      createResource: {
        _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
      },
    },
  },
});

// add formulation
mocksData.push({
  request: {
    query: CREATE_RESOURCE_FORMULATION,
    variables: {
      formulation_name: "test",
      formulation_filename: "invalid.pdf",
      formulation_type: 1,
      org_id: "myhelp",
      formulation_desc: "",
      formulation_instruction: "",
      formulation_avail_for: "[2]",
    },
  },
  result: {
    data: {
      createFormulation: {
        duplicateNames: null,
        message: null,
        result: true,
        __typename: "adminResult",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AddResource />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist add resource page", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "myhelp",
        },
      },
    });
  });

  it("submit form with valid data for formulation", async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "invalid.pdf",
    });

    await sut();

    expect(screen.getByTestId("formulation_checkbox")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("formulation_checkbox"));

    expect(screen.queryByTestId("resource_avail_onlyme")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("resource_avail_onlyme"));

    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "test" },
    });

    const hiddenFileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenFileInput.files.length).toBe(0);

    await waitFor(async () => {
      fireEvent.change(screen.getByTestId("resource_file_upload"), {
        target: { files: [file] },
      });
    });

    expect(hiddenFileInput.files.length).toBe(1);

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addResourceSubmitButton"));
    });

    await waitFor(async () => {
      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Formulation added successfully!")
      ).toBeInTheDocument();
    });
    expect(mockRouter.push).toHaveBeenCalledWith("/therapist/formulation");
  });

  it("should render complete add resource form", async () => {
    await sut();
    expect(screen.getByTestId("resource-add-form")).toBeInTheDocument();

    expect(screen.getByTestId("resource_name")).toBeInTheDocument();

    expect(screen.getByTestId("resource_type")).toBeInTheDocument();

    expect(screen.getByTestId("disorder_id")).toBeInTheDocument();

    expect(screen.getByTestId("model_id")).toBeInTheDocument();

    expect(screen.getByTestId("category_id")).toBeInTheDocument();

    expect(screen.getByTestId("resource_desc")).toBeInTheDocument();

    expect(screen.getByTestId("resource_instruction")).toBeInTheDocument();

    expect(screen.getByTestId("resource_references")).toBeInTheDocument();

    expect(screen.getByTestId("agenda")).toBeInTheDocument();

    expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_therapist")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_onlyme")).toBeInTheDocument();

    expect(screen.getByTestId("addResourceSubmitButton")).toBeInTheDocument();
  });

  it("should click disorder dropdown", async () => {
    await sut();
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });
    await expect(
      (await screen.findByTestId("disorder_id")).getAttribute("value")
    ).toBe("disorder_id_1");
  });

  it("should click model dropdown", async () => {
    await sut();
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );

    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });
    expect(screen.queryByTestId("model_id").getAttribute("value")).toBe(
      "model_id_1"
    );
  });

  it("upload file", async () => {
    await sut();

    expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();
    const hiddenFileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(hiddenFileInput.files.length).toBe(0);

    await waitFor(async () => {
      fireEvent.change(screen.getByTestId("resource_file_upload"), {
        target: { files: [file] },
      });
    });

    expect(hiddenFileInput.files.length).toBe(1);
  });

  it("submit form with out upload file should return error", async () => {
    await sut();

    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });

    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("category_id"), {
      target: { value: "category_id_1" },
    });
    fireEvent.change(screen.queryByTestId("agenda"), {
      target: { value: "agenda_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resource_avail_therapist"));

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addResourceSubmitButton"));
    });

    await (async () => {
      expect(screen.getByText("Please select a file")).toBeInTheDocument();
    });
  });

  it("submit form with out selecting avail resource should return error", async () => {
    await sut();

    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });

    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("category_id"), {
      target: { value: "category_id_1" },
    });
    fireEvent.change(screen.queryByTestId("agenda"), {
      target: { value: "agenda_id_1" },
    });

    await waitFor(async () => {
      fireEvent.change(screen.getByTestId("resource_file_upload"), {
        target: { files: [file] },
      });
    });

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addResourceSubmitButton"));
    });

    await (async () => {
      expect(
        screen.getByText("Please select availability of resource")
      ).toBeInTheDocument();
    });
  });

  it("submit form with valid data", async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "invalid.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    await sut();

    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: "2" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("category_id"), {
      target: { value: "category_id_1" },
    });
    fireEvent.change(screen.queryByTestId("agenda"), {
      target: { value: "agenda_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resource_avail_therapist"));

    await waitFor(async () => {
      fireEvent.change(screen.getByTestId("resource_file_upload"), {
        target: { files: [file] },
      });
    });

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addResourceSubmitButton"));
    });

    await waitFor(async () => {
      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Resource added successfully")
      ).toBeInTheDocument();
    });
    expect(mockRouter.push).toHaveBeenCalledWith("/therapist/resource");
  });

  it("close the pop up by pressing cancel on confirm button", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "invalid.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    await sut();

    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });

    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("category_id"), {
      target: { value: "category_id_1" },
    });
    fireEvent.change(screen.queryByTestId("agenda"), {
      target: { value: "agenda_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resource_avail_therapist"));

    await waitFor(async () => {
      fireEvent.change(screen.getByTestId("resource_file_upload"), {
        target: { files: [file] },
      });
    });

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("addResourceSubmitButton"));
    });

    await (async () => {
      expect(screen.queryByTestId("sureModal")).toBeInTheDocument();
    });
    await (async () => {
      expect(
        screen.getByTestId("addResourceModalConfirmButton")
      ).toBeInTheDocument();
    });
    await (async () => {
      fireEvent.click(screen.queryByTestId("addResourceModalCancelButton"));
    });
    // fireEvent.click(screen.queryByTestId("addResourceModalCancelButton"));
    expect(screen.queryByTestId("addResourceSubmitButton")).toBeInTheDocument();
  });

  it("checkbox check admin add resources", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("resource_avail_therapist"));
    fireEvent.click(screen.queryByTestId("resource_avail_onlyme"));

    const checkboxTherapist = screen.getByLabelText(
      "All Therapists"
    ) as HTMLInputElement;
    expect(checkboxTherapist).toBeChecked();

    const checkboxOnlyMe = screen.getByLabelText("Only Me") as HTMLInputElement;
    expect(checkboxOnlyMe).toBeChecked();
  });
});
