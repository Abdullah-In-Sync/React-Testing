import {
  render,
  screen,
} from "@testing-library/react";
import TextFieldComponent from "../common/TextField/TextFieldComponent";

const sut = async () => {
  render(
    <TextFieldComponent
      id="txtfield1"
      label="lbl1"
      name="txtfieldname1"
      value=""
      inputProps={{ "data-testid": "resource1field" }}
    />
  );
};

describe("when rendered with a `text field`", () => {
  it("should create text filed in screen", async () => {
    await sut();
    expect(screen.getByTestId("resource1field")).toBeInTheDocument();
  });
});
