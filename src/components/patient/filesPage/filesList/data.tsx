import moment from "moment";
import Link from "next/link";

export default [
  {
    id: "sNo",
    label: "S. No.",
    render: (_, i) => i + 1,
  },
  {
    id: "title",
    label: "File Name",
  },
  {
    id: "file_name",
    label: "File Link",
    renderc: ({ file_name, file_url, _id }) => (
      <Link href={file_url}>
        <a
          target="_blank"
          className="linkWithouDecoration"
          data-testid={`openLink_${_id}`}
        >
          {file_name}
        </a>
      </Link>
    ),
  },
  {
    id: "created_date",
    label: "Uploaded on",
    render: (value) => moment(value.created_date).format("DD MMMM YYYY"),
  },
  {
    id: "actions",
    label: "Actions",
    addIndex: true,
  },
];
