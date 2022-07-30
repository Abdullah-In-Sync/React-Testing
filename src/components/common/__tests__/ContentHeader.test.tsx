import { render } from "@testing-library/react";
import ContentHeader from "../../../components/common/ContentHeader";

describe("when rendered with a `title` prop", () => {
  it("should paste it into the header text", () => {
    render(<ContentHeader title="Feedback" />); 
    expect(
      <ContentHeader title="Feedback" />
    );
  });
});
      

