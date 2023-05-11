import { fireEvent, render, screen } from "@testing-library/react";
import { Node, Edge } from "reactflow";
import TemplateArrow from "../templateArrow";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const nodes: Node[] = [
  {
    width: 120,
    height: 50,
    id: "dndnode_0",
    type: "selectorNode",
    position: {
      x: 479.7364917953039,
      y: 33.66256807102641,
    },
    data: {
      label: "updated node",
    },
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: 479.7364917953039,
      y: 33.66256807102641,
    },
  },
  {
    width: 120,
    height: 50,
    id: "dndnode_1",
    type: "selectorNode",
    position: {
      x: 479.7364917953039,
      y: 33.66256807102641,
    },
    data: {
      label: "updated node2",
    },
    selected: false,
    dragging: false,
    positionAbsolute: {
      x: 485.7364917953039,
      y: 35.66256807102641,
    },
  },
];

const edges: Edge[] = [
  {
    source: "dndnode_0",
    sourceHandle: "b",
    target: "dndnode_1",
    targetHandle: "c",
    id: "reactflow__edge-dndnode_0b-dndnode_1c",
  },
  {
    source: "dndnode_2",
    sourceHandle: null,
    target: "dndnode_0",
    targetHandle: "a",
    id: "reactflow__edge-dndnode_2-dndnode_0a",
  },
];

const sut = async () => {
  render(
    <TemplateArrow nodesData={nodes} edgesData={edges} userType="fullAccess" />
  );
};

describe("When render a Arrow template", () => {
  it("should render 2 nodes and 2 edges", async () => {
    await sut();
    expect(screen.getAllByTestId("arrow-template-test-1").length).toEqual(2);
    expect(
      (await screen.findAllByTestId("arrow-preview-toggle")).length
    ).toEqual(1);
  });
});
