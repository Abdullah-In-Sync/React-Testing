import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_DISORDER_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../graphql/query/common";
import AddForm from "../admin/resource/addForm";

const resourceTypeOptions = [
  { id: "1", value: "Info Sheets" },
  { id: "2", value: "Work Sheets" },
  { id: "3", value: "Audio File" },
  { id: "4", value: "Video File" },
];

const buildMocks = (): {
  mocks: MockedResponse[];
  mockDataMap: Record<string, any>;
} => {
  const _mocks: MockedResponse[] = [];
  const _mockDataMap: Record<string, any> = {};

  // disorder
  _mocks.push({
    request: {
      query: GET_DISORDER_DATA,
    },
    result: {
      data: {
        disorderData: {
          getAllDisorder: [
            {
              _id: "disorder_id_1",
              user_type: "admin",
              disorder_name: "disorder 1",
            },
            {
              _id: "disorder_id_2",
              user_type: "admin",
              disorder_name: "disorder 2",
            },
          ],
        },
      },
    },
  });

  // model
  _mocks.push({
    request: {
      query: GET_MODEL_BY_DISORDERID_DATA,
      variables: {
        disorderId: "disorder_id_1",
      },
    },
    result: {
      data: {
        modelData: {
          getModelByDisorderId: [
            {
              _id: "model_id_1",
              model_name: "model 1",
            },
            {
              _id: "model_id_2",
              model_name: "model 2",
            },
          ],
        },
      },
    },
  });

  // category
  _mocks.push({
    request: {
      query: GET_CATEGORY_BY_MODELID_DATA,
      variables: {
        modelId: "model_id_1",
      },
    },
    result: {
      data: {
        categoryData: {
          getCategoryByModelId: [
            {
              _id: "category_id_1",
              category_name: "category 1",
            },
            {
              _id: "category_id_2",
              category_name: "category 2",
            },
          ],
        },
      },
    },
  });

  // agenda
  _mocks.push({
    request: {
      query: GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
      variables: {
        disorderId: "disorder_id_1",
        modelId: "model_id_1",
      },
    },
    result: {
      data: {
        agendaData: {
          getAgendaByDisorderModelId: [
            {
              _id: "agenda_id_1",
              agenda_name: "agenda 1",
              session: "1",
            },
            {
              _id: "agenda_id_2",
              agenda_name: "agenda 2",
              session: "1",
            },
          ],
        },
      },
    },
  });

  return { mocks: _mocks, mockDataMap: _mockDataMap };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <AddForm />
      </SnackbarProvider>
    </MockedProvider>
  );
  // await waitForElementToBeRemoved(() =>
  //     screen.queryByTestId("activity-indicator")
  // );
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

    // expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_admin")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_therapist")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_onlyme")).toBeInTheDocument();

    expect(screen.getByTestId("resource_avail_all")).toBeInTheDocument();
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

  it("should render disorder", async () => {
    await sut();
    // fireEvent.change(screen.queryByTestId("disorder_id"), {
    //     target: { value: "disorder_id_1" },
    // });
    // await waitFor(() =>
    // expect(screen.queryByTestId("disorder_id")).toHaveValue("")
    // )

    // await waitFor(() => {
    //     fireEvent.change(screen.queryByTestId("disorder_id"), {
    //         target: { value: "disorder_id_1" },
    //     });
    //     expect(screen.queryByTestId("disorder_id").getAttribute('value')).toBe("disorder_id_1")
    // })
  });
});
