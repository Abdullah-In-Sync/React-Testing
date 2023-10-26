export default [
  {
    id: "first_name",
    label: "First Name",
  },
  {
    id: "last_name",
    label: "Last Name",
  },
  {
    id: "role_detail",
    label: "Role",
    render: (v) => v.name,
  },
  {
    id: "actions",
    label: "Actions",
    addIndex: true,
  },
];
