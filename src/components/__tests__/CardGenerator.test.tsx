import { render, screen } from "@testing-library/react";
import CardGenerator from "../common/CardGenerator";

const fields = [
  {
    key: "resource_desc",
    visible: true,
  },
  {
    key: "resource_name",
    visible: true,
  },
  {
    key: "actions",
    visible: true,
  },
];

describe("when rendered with a table with data", () => {
  test("should render", () => {
    render(
      <CardGenerator
        fields={fields}
        data={[
          {
            _id: "fffe8041-fc77-40fa-a83e-cf76197d1499",
            fav_res_detail: [],
            resource_desc: "Therapist Description",
            resource_name: "Therapist Resource",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          },
          {
            _id: "abfd4ef5-66f2-463c-be2e-86fe8fa449b2",
            fav_res_detail: [],
            resource_desc: "Resource Description",
            resource_name: "Resource Name",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          },
          {
            _id: "ba3dd2f3-1fc2-45bb-bf4b-60889c530d54",
            fav_res_detail: [],
            resource_desc: "",
            resource_name: "test",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          },
        ]}
      />
    );
    expect(screen.getByTestId("cardWrapperContainer")).toBeInTheDocument();
    expect(screen.queryAllByTestId("card").length).toBe(3);
  });
});
