import { render, screen, fireEvent } from "@testing-library/react";
import PaitentTemplateEdit from "../patient/resource/edit";
import {
  TemplateDetailInterface,
  ResourceDataInterface,
} from "../patient/resource/edit/patientTemplateEditInterface";

import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const currentTemplateData: TemplateDetailInterface = {
  _id: "",
  category: "",
  name: "TestHeader",
  component_name: "TemplateTable",
};

const currentArrowTemplateData: TemplateDetailInterface = {
  _id: "",
  category: "",
  name: "TestArrowHeader",
  component_name: "ArrowTemplate",
};

const resourceData: ResourceDataInterface = {
  template_data:
    '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"test"},{"type":"answer","answerType":"boolean","answerValues":[],"patientAns":"Yes"}]}]}',
  resource_issmartdraw: "1",
  resource_name: "test name",
  resource_type: 2,
  template_id: "63774edbc553fac5d6a9bd74",
  __typename: "Resource",
};

const ArrowTemplateResourceData: ResourceDataInterface = {
  template_data:
    // eslint-disable-next-line prettier/prettier
    '{"nodes":[{"width":122,"height":65,"id":"dndnode_0","type":"selectorNode","position":{"x":240.96579766866603,"y":199.70086465491113},"data":{"label":"","patientResponse":"Response1"},"selected":false,"positionAbsolute":{"x":240.96579766866603,"y":199.70086465491113},"dragging":false},{"width":122,"height":65,"id":"dndnode_1","type":"selectorNode","position":{"x":374.465797668666,"y":312.20086465491113},"data":{"label":"test therapist3","description":"description2","patientResponse":"Response3"},"selected":false,"positionAbsolute":{"x":374.465797668666,"y":312.20086465491113},"dragging":false},{"width":122,"height":65,"id":"dndnode_2","type":"selectorNode","position":{"x":129.46579766866603,"y":312.70086465491113},"data":{"label":"test therapist2","description":"description2","patientResponse":"Response2"},"selected":false,"positionAbsolute":{"x":129.46579766866603,"y":312.70086465491113},"dragging":false}],"edges":[{"source":"dndnode_0","sourceHandle":"b","target":"dndnode_1","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0b-dndnode_1c","selected":false},{"source":"dndnode_0","sourceHandle":"b","target":"dndnode_2","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0b-dndnode_2c","selected":false}]}',
  resource_issmartdraw: "1",
  resource_name: "Test Arrow therapist",
  resource_type: 2,
  template_id: "63774edbc553fac5d6a9bd74",
  __typename: "Resource",
};

const sut = () => {
  render(
    <PaitentTemplateEdit
      templateDetail={currentTemplateData}
      resourceData={resourceData}
      mode={"edit"}
    />
  );
};

const arrowSut = () => {
  render(
    <PaitentTemplateEdit
      templateDetail={currentArrowTemplateData}
      resourceData={ArrowTemplateResourceData}
      mode={"edit"}
    />
  );
};

describe("When render a paitent template edit", () => {
  it("Should display name text in card header and breadcrum", async () => {
    await sut();
    expect(screen.getAllByText(/test name/i)).toHaveLength(2);
  });

  it("should load dynamic template", async () => {
    await sut();
    const dynamicTemplate = screen.getAllByTestId("row-0");
    expect(dynamicTemplate).toBeTruthy();
  });

  it("should back button navigate to patient resource detail page", async () => {
    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    await sut();
    const backButton = screen.getByTestId("backButton");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("should load dynamic Arrow template", async () => {
    await arrowSut();
    expect(screen.getAllByTestId("arrow-template-test-1").length).toEqual(3);
  });
});
