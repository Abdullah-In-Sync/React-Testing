import { render, screen } from "@testing-library/react";
import { AddButton } from "../common/Buttons";

describe("when rendered with a `testid` prop", () => {
  it("should create button with testId", () => {
    render(<AddButton />);
    expect(screen.getByTestId("createQuestion")).toBeInTheDocument();
  });
});
