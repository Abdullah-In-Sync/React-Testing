export default {
  monitorListHeader: [
    {
      id: "disorder_name",
      label: "Disorder",
    },
    {
      id: "therapy_detail",
      label: "Therapy",
      render: (data) => data[0] && data[0]["therapy_name"],
    },
    {
      id: "organization_settings",
      label: "Organisation",
      render: (data) => data[0] && data[0]["name"],
    },
    {
      id: "actions",
      label: "Actions",
    },
  ],
};
