import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../graphql/mutation/resource";
import { GET_PATIENT_RESOURCE_TEMPLATE } from "../graphql/query/resource";
import PatientEditTemplatePage from "../pages/patient/resource/edit/[id]/index";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_RESOURCE_TEMPLATE,
    variables: { ptsharresId: "750a6993f61d4e58917e31e1244711f5" },
  },
  result: {
    data: {
      getResourceDetailById: {
        data: [
          {
            created_date: "2022-12-14T09:23:49.062Z",
            resource_data: [
              {
                template_data:
                  '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[]}]}]}',
                resource_issmartdraw: "1",
                resource_name: "test name",
                resource_type: 2,
                template_id: "63774edbc553fac5d6a9bd74",
                __typename: "Resource",
              },
            ],
            template_detail: {
              component_name: "TemplateTable",
              category: "journal",
              _id: "63774edbc553fac5d6a9bd74",
              name: "Table Template",
              __typename: "Templates",
            },
            __typename: "Patshareresource",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_RESOURCE_TEMPLATE_RESPONSE,
    variables: {
      ptsharresId: "750a6993f61d4e58917e31e1244711f5",
      update: {
        template_response:
          '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"updated_value"}]}]}',
      },
    },
  },
  result: {
    data: {
      updatePatientResourceById: {
        template_response:
          '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"updated_value"}]}]}',
        _id: "750a6993f61d4e58917e31e1244711f5",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENT_RESOURCE_TEMPLATE,
    variables: { ptsharresId: "750a6993f61d4e58917e31e1244711f5faling" },
  },
  result: {
    data: {
      getResourceDetailById: {
        data: [
          {
            created_date: "2022-12-14T09:23:49.062Z",
            resource_data: [
              {
                template_data:
                  '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"updated_value"},{"type":"header","title":"your fav actor?","description":"about actor"}]}]}',
                resource_issmartdraw: "1",
                resource_name: "test name",
                resource_type: 2,
                template_id: "63774edbc553fac5d6a9bd74",
                __typename: "Resource",
              },
            ],
            template_detail: {
              component_name: "TemplateTable",
              category: "journal",
              _id: "63774edbc553fac5d6a9bd74",
              name: "Table Template",
              __typename: "Templates",
            },
            __typename: "Patshareresource",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_RESOURCE_TEMPLATE_RESPONSE,
    variables: {
      ptsharresId: "750a6993f61d4e58917e31e1244711f5faling",
      update: {
        template_response: "test_",
      },
    },
  },
  result: {
    data: {
      updatePatientResourceById: {
        template_response: "test_",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <PatientEditTemplatePage />
      </SnackbarProvider>
    </MockedProvider>
  );
};

describe("Patient view template page", () => {
  it("should render patient view template", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      push: jest.fn(),
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
      ...mockRouter,
    }));
    await sut();
    const tableTemplateSubmitButton = await screen.findByTestId(
      "tableTemplateSubmit"
    );
    expect(tableTemplateSubmitButton).toBeInTheDocument();
    const inputRow = await screen.findByTestId("answer_rows[1].cells[0]");
    expect(inputRow).toBeInTheDocument();
    fireEvent.change(inputRow, {
      target: { value: "updated_value" },
    });
    fireEvent.click(tableTemplateSubmitButton);
  });

  it("Should display the view on eye button click", async () => {
    await sut();
    const eyeIconButton = screen.getByTestId("eyeIconButton");
    expect(eyeIconButton).toBeInTheDocument();
    const inputRow = await screen.findByTestId("answer_rows[1].cells[0]");
    expect(inputRow).toBeInTheDocument();
    fireEvent.change(inputRow, {
      target: { value: "some text" },
    });
    fireEvent.click(eyeIconButton);
    expect(await screen.getByTestId("view-text-input")).toHaveTextContent(
      "some text"
    );
  });

  it("should render submit exception", async () => {
    (useRouter as jest.Mock).mockClear();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5faling",
      },
    }));
    await sut();
    fireEvent.click(await screen.findByTestId("tableTemplateSubmit"));
    await waitFor(async () => {
      expect(
        screen.getAllByText(/Server error please try later./i)
      ).toHaveLength(1);
    });
  });
});
