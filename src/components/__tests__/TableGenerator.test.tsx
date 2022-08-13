import { render, screen } from "@testing-library/react";
import TableGenerator from "../common/TableGenerator";

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
  test("should render", () => {
    const a = render(
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
    );
    expect(screen.getByTestId("tableId")).toBeInTheDocument();
  });
});
