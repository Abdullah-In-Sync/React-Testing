import { render, screen, fireEvent } from "@testing-library/react";
import TemplateView from "../admin/resource/templates/view";
import { ViewTemplateData } from "../admin/resource/templates/view/viewInterface";

import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const currentTemplateData: ViewTemplateData = {
  _id: "",
  category: "",
  name: "TestHeader",
  component_name: "TemplateTable",
};

const sut = () => {
  render(<TemplateView currentTemplateData={currentTemplateData} />);
};

describe("When render a template view", () => {
  it("Should display name text in card header and breadcrum", () => {
    sut();
    expect(screen.getAllByText(/TestHeader/i)).toHaveLength(2);
  });

  it("should load dynamic template", async () => {
    await sut();
    const dynamicTemplate = screen.getAllByTestId("row-0");
    expect(dynamicTemplate).toBeTruthy();
  });

  it("should back button navigate to templates list page", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    await sut();
    const backButton = screen.getByTestId("backButton");
    fireEvent.click(backButton);
    expect(mockRouter.push).toHaveBeenCalledWith(
      "/admin/resource/template/list"
    );
  });
});
