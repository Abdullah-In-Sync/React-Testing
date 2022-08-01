import { render } from "@testing-library/react";
import SideBar from "../sidebar";
import Box from "@mui/material/Box";

describe("when rendered with a `visible` prop", () => {
    it("should render", () => {
        render(<SideBar />);
        expect(
            <Box sx={{ overflow: "auto" }} />
          );
    });
});
