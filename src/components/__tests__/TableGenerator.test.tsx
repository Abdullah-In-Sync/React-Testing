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
  },
  {
    key: "organization_name",
    columnName: "Organization",
    visible: true,
  },
];

describe("when rendered with a `visible` prop", () => {
  it("should render", () => {
    render(
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
        rowOnePage={10}
        selectedRecords={[1]}
      />
    );
    expect(screen.getByTestId("tableBox")).toBeInTheDocument();
  });
});
