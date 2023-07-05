import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import {
  GET_AGENDA_BY_DISORDER_AND_MODEL_DATA,
  GET_CATEGORY_BY_MODELID_DATA,
  GET_MODEL_BY_DISORDERID_DATA,
  GET_ADMIN_TOKEN_DATA,
  GET_DISORDER_DATA_BY_ORG_ID,
} from "../graphql/query/common";
import {
  GET_TEMPLATE_LIST,
  GET_UPLOAD_RESOURCE_URL,
} from "../graphql/query/resource";

import { useRouter } from "next/router";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

import {
  CREATE_FORMULATION,
  CREATE_RESOURCE,
} from "../graphql/mutation/resource";
import { useAppContext } from "../contexts/AuthContext";
import Create from "../pages/admin/resource/create";
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
//create resource
mocksData.push({
  request: {
    query: CREATE_RESOURCE,
    variables: {
      disorderId: "disorder_id_1",
      modelId: "model_id_1",
      resourceAvailOnlyme: 1,
      resourceAvailTherapist: "1",
      resourceFilename: "test.pdf",
      resourceName: "test",
      resourceType: 1,
      agendaId: "",
      categoryId: "category_id_1",
      orgId: "2301536c4d674b3598814174d8f19593",
      resourceIssmartdraw: "1",
      templateData: '{"rows":[{"cells":[{"type":""}]}]}',
      templateId: "63774edbc553fac5d6a9bd74",
      resourceDesc: "",
      resourceInstruction: "",
      resourceIsformualation: "",
      resourceReferences: "",
    },
  },
  result: {
    data: {
      createResource: {
        _id: "agenda_id_1",
      },
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
// template list
mocksData.push({
  request: {
    query: GET_TEMPLATE_LIST,
    variables: {},
  },
  result: {
    data: {
      listTemplates: [
        {
          _id: "63774edbc553fac5d6a9bd74",
          name: "Template Amar 12345",
          component_name: "TemplateTable",
          updated_date: "2022-12-06T13:18:40.604Z",
          created_date: "2022-11-18T08:41:52.638Z",
          category: "Generic2345",
          __typename: "Templates",
        },
      ],
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
      resourceAvailAdmin: 1,
      resourceAvailAll: 1,
      resourceAvailOnlyme: 1,
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

mocksData.push({
  request: {
    query: CREATE_FORMULATION,
    variables: {
      resourceName: "test",
      formulationType: 1,
      orgId: "e7b5b7c0568b4eacad6f05f11d9c4884",
      resourceDesc: "",
      resourceInstruction: "",
      formulationAvailFor: "[1]",
      templateData:
        '{"rows":[{"height":"200px","cells":[{"type":"","width":"600px"}]}]}',
      templateId: "63774edbc553fac5d6a9bd74",
    },
  },
  result: {
    data: {
      createFormulation: {
        duplicateNames: null,
        message: null,
        result: true,
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <Create />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

describe("Admin add resource page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
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
    expect(screen.getByTestId("resource-crate-form")).toBeInTheDocument();

    expect(screen.getByTestId("resourceName")).toBeInTheDocument();

    expect(screen.getByTestId("resourceType")).toBeInTheDocument();

    expect(screen.getByTestId("disorderId")).toBeInTheDocument();

    expect(screen.getByTestId("modelId")).toBeInTheDocument();

    expect(screen.getByTestId("categoryId")).toBeInTheDocument();

    expect(screen.getByTestId("resourceDesc")).toBeInTheDocument();

    expect(screen.getByTestId("resourceInstruction")).toBeInTheDocument();

    expect(screen.getByTestId("agendaId")).toBeInTheDocument();

    expect(screen.getByTestId("resourceReferences")).toBeInTheDocument();

    expect(screen.getByTestId("resourceAvailTherapist")).toBeInTheDocument();

    expect(screen.getByTestId("resourceAvailOnlyme")).toBeInTheDocument();

    expect(screen.getByTestId("selectTemplateButton")).toBeInTheDocument();
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

  it("should click disorder dropdown", async () => {
    await sut();
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("disorderId"), {
      target: { value: "disorder_id_1" },
    });
    expect(screen.queryByTestId("disorderId").getAttribute("value")).toBe(
      "disorder_id_1"
    );
  });

  it("should click model dropdown", async () => {
    await sut();
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );

    fireEvent.change(screen.queryByTestId("disorderId"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );

    fireEvent.change(screen.queryByTestId("modelId"), {
      target: { value: "model_id_1" },
    });
    expect(screen.queryByTestId("modelId").getAttribute("value")).toBe(
      "model_id_1"
    );
  });

  it("submit form with valid data", async () => {
    await sut();

    fireEvent.change(screen.queryByTestId("resourceName"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.queryByTestId("resourceType"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    fireEvent.change(screen.queryByTestId("disorderId"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("modelId"), {
      target: { value: "model_id_1" },
    });

    fireEvent.change(screen.queryByTestId("categoryId"), {
      target: { value: "category_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resourceAvailOnlyme"));

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("selectTemplateButton"));
    });

    await (async () => {
      expect(screen.queryByTestId("TemplateProceed")).toBeInTheDocument();
    });

    await (async () => {
      expect(screen.getByTestId("componentsRadio")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("TemplateTable"));
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("TemplateProceed"));
    });

    await (async () => {
      expect(screen.getByTestId("selectDimensionButton")).toBeInTheDocument();
      expect(screen.getByTestId("rowsSelect")).toBeInTheDocument();
      expect(screen.getByTestId("colsSelect")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("selectDimensionButton"));
    });

    await (async () => {
      expect(screen.getByTestId("row-0")).toBeInTheDocument();
      expect(screen.getByTestId("cell-0")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("tableTemplateSubmit"));
    });

    await (async () => {
      expect(screen.getByTestId("SuccessModal")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("SuccessOkBtn"));
    });

    await (async () => {
      expect(pushMock).toHaveBeenCalledWith("/admin/resource/");
    });
  });

  it("check table preview", async () => {
    await sut();

    fireEvent.change(screen.queryByTestId("resourceName"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.queryByTestId("resourceType"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    fireEvent.change(screen.queryByTestId("disorderId"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("modelId"), {
      target: { value: "model_id_1" },
    });

    fireEvent.change(screen.queryByTestId("categoryId"), {
      target: { value: "category_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resourceAvailOnlyme"));

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("selectTemplateButton"));
    });

    await (async () => {
      expect(screen.queryByTestId("TemplateProceed")).toBeInTheDocument();
    });

    await (async () => {
      expect(screen.getByTestId("componentsRadio")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("TemplateTable"));
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("TemplateProceed"));
    });

    await (async () => {
      expect(screen.getByTestId("selectDimensionButton")).toBeInTheDocument();
      expect(screen.getByTestId("rowsSelect")).toBeInTheDocument();
      expect(screen.getByTestId("colsSelect")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("selectDimensionButton"));
    });

    await (async () => {
      expect(screen.getByTestId("row-0")).toBeInTheDocument();
      expect(screen.getByTestId("cell-0")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("tableTemplatePreview"));
    });

    await (async () => {
      expect(pushMock).toHaveBeenCalledWith("/template/preview/create/");
    });
  });

  it("On cancel it should remove the template table from page", async () => {
    await sut();

    fireEvent.change(screen.queryByTestId("resourceName"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.queryByTestId("resourceType"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.queryByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    fireEvent.change(screen.queryByTestId("disorderId"), {
      target: { value: "disorder_id_1" },
    });
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("activity-indicator")
    );
    fireEvent.change(screen.queryByTestId("modelId"), {
      target: { value: "model_id_1" },
    });

    fireEvent.change(screen.queryByTestId("categoryId"), {
      target: { value: "category_id_1" },
    });

    fireEvent.click(screen.queryByTestId("resourceAvailOnlyme"));

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("selectTemplateButton"));
    });

    await (async () => {
      expect(screen.queryByTestId("TemplateProceed")).toBeInTheDocument();
    });

    await (async () => {
      expect(screen.getByTestId("componentsRadio")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("TemplateTable"));
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("TemplateProceed"));
    });

    await (async () => {
      expect(screen.getByTestId("selectDimensionButton")).toBeInTheDocument();
      expect(screen.getByTestId("rowsSelect")).toBeInTheDocument();
      expect(screen.getByTestId("colsSelect")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("selectDimensionButton"));
    });

    await (async () => {
      expect(screen.getByTestId("row-0")).toBeInTheDocument();
      expect(screen.getByTestId("cell-0")).toBeInTheDocument();
    });

    await (async () => {
      fireEvent.click(screen.queryByTestId("tableTemplateCancel"));
    });

    const allRows = await screen.queryAllByTestId("row-0");

    expect(allRows.length).toEqual(0);
  });

  it("On change formulation view", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("formulationCheckbox"));
    fireEvent.change(screen.queryByTestId("resourceName"), {
      target: { value: "test" },
    });
    fireEvent.change(await screen.findByTestId("org_id"), {
      target: { value: "e7b5b7c0568b4eacad6f05f11d9c4884" },
    });
    fireEvent.click(await screen.findByTestId("resourceAvailOnlyme"));

    fireEvent.click(await screen.findByTestId("selectTemplateButton"));

    fireEvent.click(await screen.findByTestId("TemplateTable"));

    fireEvent.click(await screen.findByTestId("TemplateProceed"));
    fireEvent.click(await screen.findByTestId("selectDimensionButton"));

    fireEvent.click(await screen.findByTestId("tableTemplateSubmit"));

    const cancelButton = await screen.findByTestId("cancelButton");

    fireEvent.click(cancelButton);

    expect(cancelButton).not.toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("tableTemplateSubmit"));

    const confirmButton = await screen.findByTestId("confirmButton");

    fireEvent.click(confirmButton);

    expect(
      await screen.findByText(/Formulation has been created successfully./i)
    ).toBeInTheDocument();
  });
});
