import { MockedProvider } from "@apollo/client/testing";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import {
  GET_DISORDER_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../graphql/query/common";
import AddForm from "../admin/resource/addForm";
import userevent from "@testing-library/user-event";
import { GET_UPLOAD_RESOURCE_URL } from "../../graphql/query/resource";

const mocksData = [];
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
// upload file, presigned URL
mocksData.push({
  request: {
    query: GET_UPLOAD_RESOURCE_URL,
    variables: {
      fileName: "hello.png",
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

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <AddForm />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

describe("Admin Resource Add Form", () => {
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

    expect(screen.getByTestId("resource_avail_admin")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_therapist")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_onlyme")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_all")).toBeInTheDocument();

    expect(screen.getByTestId("addResourceSubmitButton")).toBeInTheDocument();
  });

  it("should render resource-type options by default", async () => {
    await sut();
    fireEvent.change(screen.queryByTestId("resource_type"), {
      target: { value: "2" },
    });
    expect(screen.queryByTestId("resource_type").getAttribute("value")).toBe(
      "2"
    );
  });

  it("should click disorder dropdown", async () => {
    await sut();
    fireEvent.change(screen.queryByTestId("disorder_id"), {
      target: { value: "disorder_id_1" },
    });
    expect(screen.queryByTestId("disorder_id").getAttribute("value")).toBe(
      "disorder_id_1"
    );
  });

  it("upload file", async () => {
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await sut();

    const inputFile: HTMLInputElement = screen.getByTestId(
      "resource_file_upload"
    );
    userevent.upload(inputFile, file);
    await waitFor(() => expect(inputFile).toBeTruthy());
  });

  it("submit form", async () => {
    await sut();
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    fireEvent.change(screen.queryByTestId("resource_name"), {
      target: { value: "resource_name" },
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

    const inputFile: HTMLInputElement = screen.getByTestId(
      "resource_file_upload"
    );
    userevent.upload(inputFile, file);

    fireEvent.click(screen.queryByTestId("resource_avail_all"));

    fireEvent.submit(screen.queryByTestId("addResourceSubmitButton"));
    
    await waitFor(() => {
      expect(screen.queryByTestId("sureModal")).toBeVisible();
      // fireEvent.click(screen.queryByTestId("addResourceModalConfirmButton"));
    })

    
  });

  // it("submit form cancel button dismiss popup", async () => {
  //   await sut();
  //   const file = new File(["hello"], "hello.png", { type: "image/png" });

  //   fireEvent.change(screen.queryByTestId("resource_name"), {
  //     target: { value: "resource_name" },
  //   });
  //   fireEvent.change(screen.queryByTestId("resource_type"), {
  //     target: { value: "2" },
  //   });
  //   fireEvent.change(screen.queryByTestId("disorder_id"), {
  //     target: { value: "disorder_id_1" },
  //   });
  //   fireEvent.change(screen.queryByTestId("model_id"), {
  //     target: { value: "model_id_1" },
  //   });

  //   const inputFile: HTMLInputElement = screen.getByTestId(
  //     "resource_file_upload"
  //   );
  //   userevent.upload(inputFile, file);

  //   fireEvent.click(screen.queryByTestId("resource_avail_all"));

  //   fireEvent.submit(screen.queryByTestId("addResourceSubmitButton"));
  //   expect(screen.queryByTestId("sureModal")).toBeVisible();

  //   fireEvent.click(screen.queryByTestId("addResourceModalCancelButton"));
  //   expect(screen.queryByTestId("sureModal")).not.toBeVisible();
  // });

  it("checkbox check admin add resources", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("resource_avail_admin"));
    fireEvent.click(screen.queryByTestId("resource_avail_therapist"));
    fireEvent.click(screen.queryByTestId("resource_avail_onlyme"));

    const checkboxAdmin = screen.getByLabelText('Admin') as HTMLInputElement
    expect(checkboxAdmin).toBeChecked()

    const checkboxTherapist = screen.getByLabelText('All Therapists') as HTMLInputElement
    expect(checkboxTherapist).toBeChecked()

    const checkboxOnlyMe = screen.getByLabelText('Only Me') as HTMLInputElement
    expect(checkboxOnlyMe).toBeChecked()
  });

});
