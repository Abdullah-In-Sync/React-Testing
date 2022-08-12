import { render, screen } from "@testing-library/react";
import Scrollbar from "../common/Scrollbar";

describe("when rendered with a scrollbar", () => {
  it("should visible or hide", () => {
    render(<Scrollbar />);
    expect(screen.getByTestId("scrollBar")).toBeInTheDocument();
  });
});
