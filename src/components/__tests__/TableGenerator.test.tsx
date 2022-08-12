import Box from "@mui/material/Box";
import { render, screen } from "@testing-library/react";
import dynamic from "next/dynamic";

const TableGenerator = dynamic(import("../common/TableGenerator"), {
  ssr: false,
});
const fields = [
  {
    key: "session_no",
    columnName: "Session No.",
    visible: true,
    render: (val) => val ?? "---",
  },
  {
    key: "organization_name",
    columnName: "Organization",
    visible: true,
    render: (val) => val ?? "---",
  },
];

describe("when rendered with a table with data", () => {
  it("should render", () => {
    render(
      <Box>
        <TableGenerator
          fields={fields}
          data={[
            {
              session_no: 1,
              organization_name: "myHelp",
            },
            {
              session_no: 2,
              organization_name: "restEasy",
            },
          ]}
          currentPage={1}
          dataCount={2}
          selectedRecords={[]}
          rowOnePage={10}
        />
      </Box>
    );
    expect(screen.queryAllByTestId("table-row").length).toBe(2);
  });
});
