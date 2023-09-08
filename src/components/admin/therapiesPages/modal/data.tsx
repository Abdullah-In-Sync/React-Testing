export default {
  monitorListHeader: [
    {
      id: "model_name",
      label: "Modal",
    },
    {
      id: "disorder_detail",
      label: "Disorder",
      render: (data) => data[0] && data[0]["disorder_name"],
    },
    {
      id: "therapy_detail",
      label: "Therapy",
      render: (data) => data[0] && data[0]["therapy_name"],
    },
    {
      id: "actions",
      label: "Actions",
    },
  ],
};
