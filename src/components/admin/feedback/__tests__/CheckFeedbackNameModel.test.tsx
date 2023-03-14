import { render, screen } from "@testing-library/react";
import CheckFeedbackModel from "../form/CheckFeedModel/CheckFeedbackNameModel";

describe("when rendered with a `title` prop", () => {
  it("should paste it into the header text", async () => {
    const fields = [
      {
        key: "organization_name",
        columnName: "Organization",
        visible: true,
        render: (val) => val,
      },
      {
        key: "User",
        columnName: "User",
        visible: true,
        render: () => "Client",
      },
      {
        key: "session_no",
        columnName: "Session",
        visible: true,
        render: (val) => val,
      },
    ];

    const validationList = {
      checkFeedbackName: [
        {
          org_id: "2301536c4d674b3598814174d8f19593",
          organization_name: "resteasy.dev-myhelp",
          session_no: "1",
          __typename: "FeedbackName",
        },
        {
          org_id: "2301536c4d674b3598814174d8f19593",
          organization_name: "resteasy.dev-myhelp",
          session_no: "2",
          __typename: "FeedbackName",
        },
        {
          org_id: "2301536c4d674b3598814174d8f19593",
          organization_name: "resteasy.dev-myhelp",
          session_no: "3",
          __typename: "FeedbackName",
        },
      ],
    };
    render(
      <CheckFeedbackModel
        isOpen={true}
        fields={fields}
        validationFailList={validationList}
        title={"hello"}
      />
    );

    const elements = await screen.findAllByRole("checkbox");
    expect(elements.length).toEqual(3);
  });
});
