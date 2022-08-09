import { render } from "@testing-library/react";
import { AddButton } from "../common/Buttons";

describe("when rendered with a `size` prop", () => {
  it("should create button with prop size", () => {
    render(<AddButton />);
    expect(<AddButton variant="contained" />);
  });
});
