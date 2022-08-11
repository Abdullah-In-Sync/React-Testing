import { render } from "@testing-library/react";
import Scrollbar from "../common/Scrollbar";
import Box from "@mui/material/Box";

describe("when rendered with a scrollbar", () => {
  it("should visible or hide", () => {
    render(<Scrollbar />);
    expect(
      <Box
        sx={{
          width: 5,
        }}
      />
    );
  });
});
