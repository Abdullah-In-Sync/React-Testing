export default {
  monitorListHeader: [
    {
      id: "category_name",
      label: "Category",
    },
    {
      id: "model_detail",
      label: "Model",
      render: (data) => data[0] && data[0]["model_name"],
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
