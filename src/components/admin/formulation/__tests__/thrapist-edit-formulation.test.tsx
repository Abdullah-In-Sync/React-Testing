import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import {
  GET_FORMULATION_BY_ID,
  UPDATE_FORMULATION,
} from "../../../../graphql/formulation/graphql";
import FormulationEditScreen from "../../../../pages/therapist/formulation/edit/[id]";
import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

const mocksData = [];

mocksData.push({
  request: {
    query: GET_FORMULATION_BY_ID,
    variables: {
      formulation_id: "formulation-id-1",
    },
  },
  result: {
    data: {
      getFormulationById: {
        fav_for_detail: null,
        formulation_avail_for: "[2]",
        formulation_desc: "desc test",
        formulation_img: "",
        formulation_instruction: "instruction test",
        formulation_name: "001dfg 6thJune formula",
        formulation_status: 1,
        formulation_type: 1,
        formulation_url: null,
        org_id: "org-id-1",
        template_data:
          '{"rows":[{"height":"200px","cells":[{"type":"header","width":"600px","title":"cvbn"},{"type":"answer","width":"600px","answerType":"text","answerValues":[]}]},{"height":"200px","cells":[{"type":"","width":"600px"},{"type":"","width":"600px"}]}]}',
        template_id: "63774edbc553fac5d6a9bd74",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        _id: "formulation-id-1",
        download_formulation_url: null,
        __typename: "AdminFormulationData",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_FORMULATION,
    variables: {
      formulation_id: "formulation-id-1",
      updateFormulation: {
        formulation_name: "001dfg 6thJune formula",
        formulation_type: 1,
        formulation_desc: "desc test",
        formulation_instruction: "instruction test",
        formulation_avail_for: "[2]",
        org_id: "org-id-1",
        template_data:
          '{"rows":[{"height":"200px","cells":[{"type":"header","width":"600px","title":"cvbn"},{"type":"answer","width":"600px","answerType":"text","answerValues":[]}]},{"height":"200px","cells":[{"type":"","width":"600px"},{"type":"","width":"600px"}]}]}',
        template_id: "63774edbc553fac5d6a9bd74",
      },
    },
  },
  result: {
    data: {
      updateFormulationById: {
        _id: "formulation-id-1",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <FormulationEditScreen />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "formulation-id-1",
    },
    push: pushMock,
  });
});

describe("Therapist edit formultion", () => {
  it("should render edit therapist formulation screen and submit the form", async () => {
    await sut();
    expect(await screen.findByText(/instruction test/i)).toBeInTheDocument();

    const submitFormButton = await screen.findByTestId("tableTemplateSubmit");

    fireEvent.click(submitFormButton);
    const optionConfirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(optionConfirmButton);

    expect(
      await screen.findByText(/Formulation updated successfully./i)
    ).toBeInTheDocument();
    const cancelButton = await screen.findByTestId("tableTemplateCancel");
    fireEvent.click(cancelButton);
    const coptionConfirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(coptionConfirmButton);
    expect(pushMock).toBeCalled();
  });
  it("should select template", async () => {
    await sut();
    const selectTemplateButton = await screen.findByTestId("selectTemplate");
    fireEvent.click(selectTemplateButton);
    expect(await screen.findAllByText(/Select Template/i)).toHaveLength(2);
  });
});
