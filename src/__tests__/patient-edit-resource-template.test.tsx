import { MockedProvider } from "@apollo/client/testing";
import { SnackbarProvider } from "notistack";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { GET_PATIENT_RESOURCE_TEMPLATE } from "../graphql/query/resource";
import { UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../graphql/mutation/resource";
import PatientEditTemplatePage from "../pages/patient/resource/edit/[id]/index";

jest.mock("next/router", () => ({
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
      getResourceDetailById: [
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
      getResourceDetailById: [
        {
          created_date: "2022-12-14T09:23:49.062Z",
          resource_data: [
            {
              template_data:
                '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"updated_value"}]}]}',
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
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
    }));
    await sut();
    await waitFor(async () => {
      expect(screen.getAllByText(/test name/i)).toHaveLength(2);
      const tableTemplateSubmitButton = screen.getByTestId(
        "tableTemplateSubmit"
      );
      expect(tableTemplateSubmitButton).toBeInTheDocument();
      const inputRow = screen.getByTestId("answer_rows[1].cells[0]");
      expect(inputRow).toBeInTheDocument();
      fireEvent.change(inputRow, {
        target: { value: "updated_value" },
      });
      fireEvent.click(tableTemplateSubmitButton);

      expect(
        screen.getByText("Your worksheet has been created successfully.")
      ).toBeInTheDocument();
    });
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
