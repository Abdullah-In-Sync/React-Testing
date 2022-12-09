import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import AddResource from "../pages/admin/resource/add";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
  GET_ADMIN_TOKEN_DATA,
  GET_DISORDER_DATA_BY_ORG_ID,
} from "../graphql/query/common";
import { GET_UPLOAD_RESOURCE_URL } from "../graphql/query/resource";

import * as s3 from "../lib/helpers/s3";

import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

import { CREATE_RESOURCE } from "../graphql/mutation/resource";
import { useAppContext } from "../contexts/AuthContext";
import { GET_ORG_DATA } from "../graphql/query";

// mocks
const mocksData = [];
// disorder
mocksData.push({
  request: {
    query: GET_ORG_DATA,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "e7b5b7c0568b4eacad6f05f11d9c4884",
          name: "dev-myhelp",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_DISORDER_DATA_BY_ORG_ID,
    variables: {
      orgId: "e7b5b7c0568b4eacad6f05f11d9c4884",
    },
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
// token data
mocksData.push({
  request: {
    query: GET_ADMIN_TOKEN_DATA,
    variables: {},
  },
  result: {
    data: {
      getTokenData: {
        _id: "some-admin-id",
        user_type: "admin",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
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

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <AddResource />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
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

  it("should click org dropdown", async () => {
    await sut();
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    expect(screen.queryByTestId("org_id").getAttribute("value")).toBe(
      "e7b5b7c0568b4eacad6f05f11d9c4884"
    );
  });

  it("should click disorder dropdown and model dropdown", async () => {
    await sut();
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });
    await expect(
      screen.queryByTestId("disorder_id").getAttribute("value")
    ).toBe("disorder_id_1");

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
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });

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
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
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
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });

    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });

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
      fireEvent.click(screen.queryByTestId("addResourceModalConfirmButton"));
    });

    await (async () => {
      expect(
        screen.getByText("Resource added successfully")
      ).toBeInTheDocument();
    });

    await (async () => {
      expect(mockRouter.push).toHaveBeenCalledWith("/admin/resource");
    });
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
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });

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

    fireEvent.click(screen.queryByTestId("addResourceSubmitButton"));

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

    await (async () => {
      expect(
        screen.queryByTestId("addResourceSubmitButton")
      ).toBeInTheDocument();
    });
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
