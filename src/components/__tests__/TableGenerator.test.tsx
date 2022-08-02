import { render } from "@testing-library/react";
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
  {
    key: "question",
    columnName: "Questions",
    visible: true,
    render: (val) => val ?? "---",
  },
  {
    key: "feedback_type",
    columnName: "Type",
    visible: true,
    render: (val) => val ?? "---",
  },
  {
    key: "created_date",
    columnName: "Created on",
    visible: true,
    render: (val) => val ?? "---",
  },
];

describe("when rendered with a `visible` prop", () => {
  it("should render", () => {
    render(
      <TableGenerator
        fields={fields}
        loader={false}
        data={[]}
        currentPage={1}
        onPageChange={(page = 0, direction = "next") => {}}
        backendPagination={true}
        rowOnePage={10}
      />
    );
  });
});
