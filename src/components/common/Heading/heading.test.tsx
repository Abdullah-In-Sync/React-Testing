import { render, screen } from "@testing-library/react";
import MYHelpHeading from ".";

describe("MYHelpHeading", () => {
  it("should render the title correctly", () => {
    const title = "This is the title";
    render(<MYHelpHeading title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toEqual("H3");
  });
});
