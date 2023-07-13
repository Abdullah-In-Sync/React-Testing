import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { GET_FORMULATION_BY_ID } from "../../../../graphql/formulation/graphql";
import FormulationViewScreen from "../../../../pages/admin/formulation/view/[id]";
import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const pushMock = jest.fn();

const mocksData = [];

mocksData.push({
  request: {
    query: GET_FORMULATION_BY_ID,
    variables: {
      formulation_id: "formulation-table-template-1",
    },
  },
  result: {
    data: {
      getFormulationById: {
        formulation_avail_for: "[2]",
        formulation_desc: "desc test",
        formulation_instruction: "instruction test",
        formulation_name: "001dfg 6thJune formula",
        formulation_url: null,
        org_id: "org-id-1",
        template_data:
          '{"rows":[{"height":"200px","cells":[{"type":"header","width":"600px","title":"cvbn"},{"type":"answer","width":"600px","answerType":"text","answerValues":[]}]},{"height":"200px","cells":[{"type":"","width":"600px"},{"type":"","width":"600px"}]}]}',
        template_id: "63774edbc553fac5d6a9bd74",
        _id: "formulation-table-template-1",
        download_formulation_url: null,
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_FORMULATION_BY_ID,
    variables: {
      formulation_id: "formulation-flow-template-1",
    },
  },
  result: {
    data: {
      getFormulationById: {
        fav_for_detail: null,
        formulation_avail_for: "[2,1]",
        formulation_desc: "This is description for this today. YES",
        formulation_img: "",
        formulation_instruction: "maybe",
        formulation_name: "6thJuly Formulation Amar EDIT",
        formulation_status: 1,
        formulation_type: 1,
        formulation_url: null,
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        template_data:
          '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":160.4868967464854,"y":255.6088277394549},"data":{"label":"sdddd","description":"description text"},"style":{"width":298,"height":248},"selected":true,"positionAbsolute":{"x":160.4868967464854,"y":255.6088277394549},"dragging":false},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":528.8119243841398,"y":499.7649277354359},"data":{"label":"ggf"},"style":{"width":298,"height":248},"selected":false,"positionAbsolute":{"x":528.8119243841398,"y":499.7649277354359},"dragging":false}],"edges":[{"source":"dndnode_1","sourceHandle":"source_left1","target":"dndnode_0","targetHandle":"target_right0","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_1source_left1-dndnode_0target_right0"}]}',
        template_id: "6434fe98582849e2152d631c",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        _id: "6b4e2ebc-edb5-4ca2-af58-0b1fd3676ebb",
        download_formulation_url: null,
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_FORMULATION_BY_ID,
    variables: {
      formulation_id: "formulation-image-1",
    },
  },
  result: {
    data: {
      getFormulationById: {
        fav_for_detail: null,
        formulation_avail_for: "[1]",
        formulation_desc: null,
        formulation_instruction: "some",
        formulation_name: "image to formulation folder",
        formulation_status: 1,
        formulation_type: 1,
        formulation_url: "https://demo.com?format_1.png",
        org_id: "org-id-1",
        template_data: "",
        template_id: "",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        _id: "formulation-image-1",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <FormulationViewScreen />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin view formultion", () => {
  it("should render table template", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "formulation-table-template-1",
      },
      push: pushMock,
    });
    await sut();

    const infoIconBtn = await screen.findByTestId("infoIconButton");
    fireEvent.click(infoIconBtn);
    expect(await screen.findByText(/instruction test/i)).toBeInTheDocument();
    const modalCloseButton = await screen.findByTestId("modalCrossIcon");
    fireEvent.click(modalCloseButton);
    expect(await screen.findAllByText(/001dfg 6thJune formula/i)).toHaveLength(
      1
    );
  });
  it("should render flow template", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "formulation-flow-template-1",
      },
      push: pushMock,
    });
    await sut();
    expect(
      await screen.findAllByText(/6thJuly Formulation Amar EDIT/i)
    ).toHaveLength(1);
  });
  it("should render image", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "formulation-image-1",
      },
      push: pushMock,
    });
    await sut();
    // const selectTemplateButton = await screen.findByTestId("selectTemplate");
    // fireEvent.click(selectTemplateButton);
    expect(
      await screen.findAllByText(/image to formulation folder/i)
    ).toHaveLength(1);
  });
});
