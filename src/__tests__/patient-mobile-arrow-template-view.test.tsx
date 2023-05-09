import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../graphql/mutation/resource";
import { GET_PATIENT_RESOURCE_TEMPLATE } from "../graphql/query/resource";
import PatientMobileArrowTemplatePage from "../pages/mobile/patient/[sourceId]";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_RESOURCE_TEMPLATE,
    variables: { ptsharresId: "fec3807e-bd64-4607-aa82-ec08b31a17ba" },
  },
  result: {
    data: {
      getResourceDetailById: [
        {
          created_date: "2023-05-06T04:10:48.981Z",
          resource_data: [
            {
              // eslint-disable-next-line prettier/prettier
              template_data: "{\"nodes\":[{\"width\":117,\"height\":47,\"id\":\"dndnode_0\",\"type\":\"selectorNode\",\"position\":{\"x\":427,\"y\":-18.462500000000006},\"data\":{\"label\":\"Trigger\"},\"positionAbsolute\":{\"x\":427,\"y\":-18.462500000000006},\"selected\":false,\"dragging\":false},{\"width\":117,\"height\":47,\"id\":\"dndnode_2\",\"type\":\"selectorNode\",\"position\":{\"x\":427,\"y\":249.36875},\"data\":{\"label\":\"Behaviour\"},\"selected\":false,\"positionAbsolute\":{\"x\":427,\"y\":249.36875},\"dragging\":false},{\"width\":117,\"height\":47,\"id\":\"dndnode_3\",\"type\":\"selectorNode\",\"position\":{\"x\":251.5,\"y\":188.36874999999998},\"data\":{\"label\":\"Feeling\"},\"selected\":false,\"dragging\":false,\"positionAbsolute\":{\"x\":251.5,\"y\":188.36874999999998}}],\"edges\":[{\"source\":\"dndnode_0\",\"sourceHandle\":null,\"target\":\"dndnode_1\",\"targetHandle\":\"c\",\"type\":\"smoothstep\",\"markerEnd\":{\"type\":\"arrow\"},\"id\":\"reactflow__edge-dndnode_0-dndnode_1c\",\"selected\":false},{\"source\":\"dndnode_0\",\"sourceHandle\":\"b\",\"target\":\"dndnode_2\",\"targetHandle\":\"c\",\"type\":\"smoothstep\",\"markerEnd\":{\"type\":\"arrow\"},\"id\":\"reactflow__edge-dndnode_0b-dndnode_2c\"},{\"source\":\"dndnode_3\",\"sourceHandle\":null,\"target\":\"dndnode_0\",\"targetHandle\":\"a\",\"type\":\"smoothstep\",\"markerEnd\":{\"type\":\"arrow\"},\"id\":\"reactflow__edge-dndnode_3-dndnode_0a\",\"selected\":false}]}",
              resource_issmartdraw: "1",
              resource_name: "Indi arrow",
              resource_type: 2,
              template_id: "6434fe98582849e2152d631c",
              __typename: "Resource",
            },
          ],
          template_detail: {
            component_name: "ArrowTemplate",
            category: "Arrow Template",
            _id: "6434fe98582849e2152d631c",
            name: "Arrow Template",
            __typename: "Templates",
          },
          // eslint-disable-next-line prettier/prettier
            template_response: "{\"nodes\":[{\"width\":122,\"height\":66,\"id\":\"dndnode_0\",\"type\":\"selectorNode\",\"position\":{\"x\":427,\"y\":-18.462500000000006},\"data\":{\"label\":\"Trigger\"},\"positionAbsolute\":{\"x\":427,\"y\":-18.462500000000006},\"selected\":false,\"dragging\":false},{\"width\":122,\"height\":66,\"id\":\"dndnode_2\",\"type\":\"selectorNode\",\"position\":{\"x\":427,\"y\":249.36875},\"data\":{\"label\":\"Behaviour\",\"patientResponse\":\"\"},\"selected\":false,\"positionAbsolute\":{\"x\":427,\"y\":249.36875},\"dragging\":false},{\"width\":122,\"height\":66,\"id\":\"dndnode_3\",\"type\":\"selectorNode\",\"position\":{\"x\":251.5,\"y\":188.36874999999998},\"data\":{\"label\":\"Feeling\",\"patientResponse\":\"\"},\"selected\":false,\"dragging\":false,\"positionAbsolute\":{\"x\":251.5,\"y\":188.36874999999998}}],\"edges\":[{\"source\":\"dndnode_0\",\"sourceHandle\":null,\"target\":\"dndnode_1\",\"targetHandle\":\"c\",\"type\":\"smoothstep\",\"markerEnd\":{\"type\":\"arrow\"},\"id\":\"reactflow__edge-dndnode_0-dndnode_1c\",\"selected\":false},{\"source\":\"dndnode_0\",\"sourceHandle\":\"b\",\"target\":\"dndnode_2\",\"targetHandle\":\"c\",\"type\":\"smoothstep\",\"markerEnd\":{\"type\":\"arrow\"},\"id\":\"reactflow__edge-dndnode_0b-dndnode_2c\"},{\"source\":\"dndnode_3\",\"sourceHandle\":null,\"target\":\"dndnode_0\",\"targetHandle\":\"a\",\"type\":\"smoothstep\",\"markerEnd\":{\"type\":\"arrow\"},\"id\":\"reactflow__edge-dndnode_3-dndnode_0a\",\"selected\":false}]}",
          __typename: "Patshareresource",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <PatientMobileArrowTemplatePage token="styoerhecbd" />
      </SnackbarProvider>
    </MockedProvider>
  );
};

describe("Patient mobile view Arrow template page", () => {
  it("should render patient mobile view Arrow template", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        sourceId: "fec3807e-bd64-4607-aa82-ec08b31a17ba",
      },
      ...mockRouter,
    }));
    await sut();
    const arrowTemplate = await screen.findAllByTestId("arrow-template-test-1");
    expect(arrowTemplate.length).toEqual(3);
    // const ArrowTemplateSaveButton = await screen.findByTestId(
    //   "ArrowMobileTemplateSave"
    // );
    // expect(ArrowTemplateSaveButton).toBeInTheDocument();
    // const inputRow = await screen.findByTestId(
    //   "arrow-template-response-input-dndnode_3"
    // );
    // expect(inputRow).toBeInTheDocument();
    // fireEvent.change(inputRow, {
    //   target: { value: "updated_value" },
    // });
    // fireEvent.click(ArrowTemplateSaveButton);
    // const successOkBtn = await screen.findByTestId("SuccessOkBtn");
    // fireEvent.click(successOkBtn);
    // expect(mockRouter.push).toHaveBeenCalledWith(
    //   "/patient/therapy/?tab=resources"
    // );
    // expect(successOkBtn).not.toBeInTheDocument();
  });
});
