import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import EditResource from "../pages/admin/resource/edit/[id]/index";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
  GET_ADMIN_TOKEN_DATA,
} from "../graphql/query/common";
import {
  GET_RESOURCE_DETAIL,
  GET_UPLOAD_RESOURCE_URL,
} from "../graphql/query/resource";
import { getUpdatedFileName } from "../lib/helpers/s3";
import { UPDATE_RESOURCE_BY_ID } from "../graphql/mutation/resource";
import * as s3 from "../lib/helpers/s3";

// mocks
const useRouter = jest.spyOn(require("next/router"), "useRouter");

const mocksData = [];

const file = new File(["hello"], "hello.png", { type: "image/png" });

// disorder
mocksData.push({
  request: {
    query: GET_DISORDER_DATA,
    variables: {},
  },
  result: {
    data: {
      getAllDisorder: [
        {
          _id: "disorder_id_1",
          user_type: "admin",
          disorder_name: "disorder 1",
        },
      ],
    },
  },
});

//RESOURCE DETAIL
mocksData.push({
  request: {
    query: GET_RESOURCE_DETAIL,
    variables: { resourceId: "750a6993f61d4e58917e31e1244711f5" },
  },
  result: {
    data: {
      getResourceById: [
        {
          _id: "750a6993f61d4e58917e31e1244711f5",
          resource_name: "test name",
          resource_desc: "test desc",
          resource_instruction: "test instruct",
          resource_references: "test reference",
          resource_url: "http://google.com",
          download_resource_url: "http://google.com",
          resource_type: 2,
          category_id: "category-id",
          agenda_id: "agenda-id",
          disorder_detail: {
            _id: "disorder-id",
            disorder_name: "test disorder",
          },
          model_detail: {
            _id: "4e110b3e7faa47c9be82540fe8e78fb0",
            model_name: "test mddel",
          },
          resource_avail_onlyme: "0",
          resource_avail_admin: "1",
          resource_avail_therapist: "1",
          resource_avail_all: "0",
          resource_filename: "sample.pdf",
        },
      ],
    },
  },
});

//UPDATE RESOURCE BY ID

mocksData.push({
  request: {
    query: UPDATE_RESOURCE_BY_ID,
    variables: {
      resourceId: "750a6993f61d4e58917e31e1244711f5",
      update: {
        resource_name: "avbv",
        resource_type: 2,
        resource_issmartdraw: "0",
        resource_isformualation: "0",
        disorder_id: "disorder_id_1",
        model_id: "",
        category_id: "",
        resource_desc: "",
        resource_instruction: "",
        resource_references: "",
        agenda_id: "",
        resource_avail_admin: 1,
        resource_avail_therapist: 1,
        resource_avail_onlyme: 1,
        resource_avail_all: 1,
        resource_filename: "",
      },
    },
  },
  result: {
    data: {
      updateResourceById: [
        {
          user_id: "user_id",
          user_type: "use type",
          resource_name: "user name",
          resource_type: 2,
          resource_issmartdraw: "is_draw",
          resource_isformualation: "is for",
          disorder_id: " disorder_id",
          model_id: "model_id",
          category_id: "cata_id",
          org_id: "org_id",
          resource_desc: "resource dis",
          resource_instruction: "resource ins",
          resource_references: "resourse ref",
          resource_session_no: "resource session",
          agenda_id: "agenda_id",
          resource_url: "resource_url",
          resource_avail_admin: "admin",
          resource_avail_therapist: "therapist",
          resource_avail_onlyme: "only me",
          resource_avail_all: "all",
          resource_filename: "file name",
          resource_status: "status",
          created_date: "2-1-22",
          resource_returnurl: "url",
          download_resource_url: "download url",
        },
      ],
    },
  },
});
mocksData.push({
  request: {
    query: UPDATE_RESOURCE_BY_ID,
    variables: {
      resourceId: "750a6993f61d4e58917e31e1244711",
      update: {
        resource_name: "avbv",
        resource_type: 2,
        resource_issmartdraw: "0",
        resource_isformualation: "0",
        disorder_id: "disorder_id_1",
        model_id: "",
        category_id: "",
        resource_desc: "",
        resource_instruction: "",
        resource_references: "",
        agenda_id: "",
        resource_avail_admin: 1,
        resource_avail_therapist: 1,
        resource_avail_onlyme: 1,
        resource_avail_all: 1,
        resource_filename: "test.pdf",
      },
    },
  },
  result: {
    data: {
      updateResourceById: [
        {
          user_id: "user_id",
          user_type: "use type",
          resource_name: "user name",
          resource_type: 2,
          resource_issmartdraw: "is_draw",
          resource_isformualation: "is for",
          disorder_id: " disorder_id",
          model_id: "model_id",
          category_id: "cata_id",
          org_id: "org_id",
          resource_desc: "resource dis",
          resource_instruction: "resource ins",
          resource_references: "resourse ref",
          resource_session_no: "resource session",
          agenda_id: "agenda_id",
          resource_url: "resource_url",
          resource_avail_admin: "admin",
          resource_avail_therapist: "therapist",
          resource_avail_onlyme: "only me",
          resource_avail_all: "all",
          resource_filename: "file name",
          resource_status: "status",
          created_date: "2-1-22",
          resource_returnurl: "url",
          download_resource_url: "download url",
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
mocksData.push({
  request: {
    query: GET_UPLOAD_RESOURCE_URL,
    variables: {
      fileName: "invalid.pdf",
    },
  },
  result: {
    data: {
      getUploadResourceUrl: {
        resource_upload: "https://aws.s3.fileupload",
      },
    },
  },
});
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

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <EditResource />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

describe("Admin edit resource page", () => {
  beforeEach(() => {
    useRouter.mockClear();
  });

  it("should render complete edit resource form input field", async () => {
    await sut();
    expect(screen.getByTestId("resource-edit-form")).toBeInTheDocument();

    expect(screen.getByTestId("resource_name")).toBeInTheDocument();

    expect(screen.getByTestId("resource_type")).toBeInTheDocument();

    expect(screen.getByTestId("disorder_id")).toBeInTheDocument();

    expect(screen.getByTestId("model_id")).toBeInTheDocument();

    expect(screen.getByTestId("category_id")).toBeInTheDocument();

    expect(screen.getByTestId("resource_desc")).toBeInTheDocument();

    expect(screen.getByTestId("resource_instruction")).toBeInTheDocument();

    expect(screen.getByTestId("resource_references")).toBeInTheDocument();

    expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_admin")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_therapist")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_onlyme")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_all")).toBeInTheDocument();

    expect(screen.getByTestId("editResourceSubmitButton")).toBeInTheDocument();
  });

  it("submit form with out selecting avail resource should return error", async () => {
    await sut();

    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: null },
    });
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("editResourceSubmitButton"));
    });

    await expect(window.alert("Please fill in this field."));
  });

  it("should render complete edit resource form", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
    }));
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("resource_name")).toHaveValue("test name");

      expect(screen.getByTestId("resource-edit-form")).toBeInTheDocument();

      expect(screen.getByTestId("resource_type")).toHaveValue("2");

      expect(screen.getByTestId("disorder_id")).toBeInTheDocument(); // todo
      expect(screen.getByTestId("model_id")).toBeInTheDocument(); // todo
      expect(screen.getByTestId("category_id")).toBeInTheDocument(); // todo

      expect(screen.getByTestId("resource_desc")).toHaveValue("test desc");

      expect(screen.getByTestId("resource_instruction")).toHaveValue(
        "test instruct"
      );

      expect(screen.getByTestId("resource_references")).toHaveValue(
        "test reference"
      );

      expect(screen.getByTestId("agenda_id")).toHaveValue("agenda-id");

      expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();

      expect(screen.getByTestId("resource_avail_admin")).toBeChecked();
      expect(screen.getByTestId("resource_avail_therapist")).toBeChecked();
      expect(screen.getByTestId("resource_avail_therapist")).toBeInTheDocument; //todo
      expect(screen.getByTestId("resource_avail_all")).toBeInTheDocument; // todo
      expect(screen.getByTestId("edit-upload-file").textContent).toEqual(
        "sample.pdf"
      );

      expect(
        screen.getByTestId("editResourceSubmitButton")
      ).toBeInTheDocument();
    });
  });

  it("submit edit form without uploading file", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
    }));

    await sut();
    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "avbv" },
    });
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: 2 },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });

    screen.queryByTestId("activity-indicator");

    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });

    screen.queryByTestId("activity-indicator");

    fireEvent.change(screen.queryByTestId("category_id"), {
      target: { value: "category_id_1" },
    });
    fireEvent.change(screen.queryByTestId("agenda_id"), {
      target: { value: "agenda_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resource_avail_all"));

    await waitFor(async () => {
      fireEvent.submit(screen.queryByTestId("resource-edit-form"));
    });

    expect(screen.queryByTestId("sureModal")).toBeInTheDocument();
    expect(screen.getByTestId("editResourceModalConfirmButton")).toBeVisible();

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("editResourceModalConfirmButton"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Resource edit successfully")
      ).toBeInTheDocument();
    });

    //expect(mockRouter.push).toHaveBeenCalledWith("/admin/resource");
  });

  it.only("submit edit form with the with file", async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    useRouter.mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711",
      },
    }));
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "test.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    await sut();
    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "avbv" },
    });
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: 2 },
    });
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });

    screen.queryByTestId("activity-indicator");

    fireEvent.change(screen.queryByTestId("model_id"), {
      target: { value: "model_id_1" },
    });

    screen.queryByTestId("activity-indicator");

    fireEvent.change(screen.queryByTestId("category_id"), {
      target: { value: "category_id_1" },
    });
    fireEvent.change(screen.queryByTestId("agenda_id"), {
      target: { value: "agenda_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resource_avail_all"));

    await waitFor(async () => {
      fireEvent.change(screen.getByTestId("resource_file_upload"), {
        target: { files: [file] },
      });
    });

    await waitFor(async () => {
      fireEvent.submit(screen.queryByTestId("resource-edit-form"));
    });

    expect(screen.queryByTestId("sureModal")).toBeInTheDocument();
    expect(screen.getByTestId("editResourceModalConfirmButton")).toBeVisible();

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("editResourceModalConfirmButton"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Resource edit successfully")
      ).toBeInTheDocument();
    });

    // expect(mockRouter.push).toHaveBeenCalledWith("/admin/resource");
  });

  it("checkbox check admin edit resources", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("resource_avail_admin"));
    fireEvent.click(screen.queryByTestId("resource_avail_therapist"));
    fireEvent.click(screen.queryByTestId("resource_avail_onlyme"));

    const checkboxAdmin = screen.getByLabelText("Admin") as HTMLInputElement;
    expect(checkboxAdmin).toBeChecked();

    const checkboxTherapist = screen.getByLabelText(
      "All Therapists"
    ) as HTMLInputElement;
    expect(checkboxTherapist).toBeChecked();

    const checkboxOnlyMe = screen.getByLabelText("Only Me") as HTMLInputElement;
    expect(checkboxOnlyMe).toBeChecked();
  });
});
