import { activeInactiveText } from "../../../../lib/constants";
import { firstLetterCapital } from "../../../../utility/helper";

export default {
  therapistListHeader: [
    {
      id: "therapist_name",
      label: "Name",
    },
    {
      id: "org_data",
      label: "Organisation",
      render: (data) => data[0] && data[0]["name"],
    },
    {
      id: "therapist_status",
      label: "Status",
      render: (value) => activeInactiveText[value],
    },
    {
      id: "plan",
      label: "Plan",
      render: (value) => firstLetterCapital(value),
    },
    {
      id: "actions",
      label: "Actions",
      addIndex: true,
    },
  ],
};
