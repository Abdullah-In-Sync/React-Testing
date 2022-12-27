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

const currentTemplateData: TemplateDetailInterface = {
  _id: "",
  category: "",
  name: "TestHeader",
  component_name: "TemplateTable",
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

const sut = () => {
  render(
    <PaitentTemplateEdit
      templateDetail={currentTemplateData}
      resourceData={resourceData}
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
});
