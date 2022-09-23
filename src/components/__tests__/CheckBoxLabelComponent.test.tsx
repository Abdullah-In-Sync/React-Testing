import { render, screen } from "@testing-library/react";
import CheckBoxLabelComponent from "../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";

let resource_checkbox = 0;

describe("when rendered with a `checkbox label`", () => {
  beforeEach(() => {
    render(
      <CheckBoxLabelComponent
        value="1"
        name="resource_checkbox"
        onChange={() => (resource_checkbox = Math.abs(resource_checkbox - 1))}
        label="Everyone"
        placement="end"
        inputProps={{ "data-testid": "resource_checkbox" }}
        checked={resource_checkbox}
        size="small"
      />
    );
  });
  it("should render checkbox in screen", async () => {
    const checkBox = screen.getByTestId("resource_checkbox");
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();
  });
});

describe("when rendered with a medium size `checkbox label`", () => {
  it("should render checkbox in screen", async () => {
    render(
      <CheckBoxLabelComponent
        value="1"
        name="resource_checkbox"
        onChange={() => (resource_checkbox = Math.abs(resource_checkbox - 1))}
        label="Everyone"
        placement="end"
        inputProps={{ "data-testid": "resource_checkbox" }}
        checked={resource_checkbox}
      />
    );
    const checkBox = screen.getByTestId("resource_checkbox");
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();
  });
});
