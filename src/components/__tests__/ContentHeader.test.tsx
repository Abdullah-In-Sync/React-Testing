import { render, screen } from "@testing-library/react";
import ContentHeader from "../common/ContentHeader";

describe("when rendered with a `title` prop", () => {
  it("should paste it into the header text", () => {
    render(<ContentHeader title="Feedback" />);
    expect(screen.getByText("Feedback")).toBeInTheDocument();
  });
});
