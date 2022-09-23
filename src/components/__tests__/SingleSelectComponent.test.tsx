import { MockedResponse } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";
import { GET_DISORDER_DATA, GET_TOKEN_DATA } from "../../graphql/query/common";
import SingleSelectComponent from "../common/SelectBox/SingleSelect/SingleSelectComponent";

const resourceTypeOptions = [
  { id: "1", value: "Info Sheets" },
  { id: "2", value: "Work Sheets" },
  { id: "3", value: "Audio File" },
  { id: "4", value: "Video File" },
];

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  // fetch token for user query
  _mocks.push({
    request: {
      query: GET_TOKEN_DATA,
      variables: {},
    },
    result: {
      data: [
        {
          _id: "7fcfbac1-82db-4366-aa76-bf8d649b2a24",
          user_type: "admin",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: 1,
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
        },
      ],
    },
  });
  // fetch Admin Resource list query
  _mocks.push({
    request: {
      query: GET_DISORDER_DATA,
    },
    result: {
      data: {
        disorderData: {
          getAllDisorder: [
            {
              _id: "disorder_id_1",
              user_type: "admin",
              disorder_name: "disorder 1",
            },
            {
              _id: "disorder_id_2",
              user_type: "admin",
              disorder_name: "disorder 2",
            },
          ],
        },
      },
    },
  });

  return { mocks: _mocks };
};

const disorderData: any = [
  {
    _id: "disorder_id_1",
    user_type: "admin",
    disorder_name: "disorder 1",
  },
  {
    _id: "disorder_id_2",
    user_type: "admin",
    disorder_name: "disorder 2",
  },
];

const sut = async () => {
  render(
    <SingleSelectComponent
      fullWidth={true}
      id="testSelect"
      labelId="labelId"
      name="Test Select box"
      value="3"
      label="Suggested Test Selectbox"
      // onChange={set2}
      inputProps={{ "data-testid": "selectBoxTest" }}
      options={resourceTypeOptions}
      mappingKeys={["id", "value"]}
      size={"small"}
    />
  );
};

const sutDisorder = async () => {
  render(
    <SingleSelectComponent
      fullWidth={true}
      required={true}
      id="resourceDisorderSelect"
      labelId="resourceDisorder"
      name="disorder_id"
      value="disorder_id_2"
      label="Select Disorder"
      // onChange={set2}
      inputProps={{ "data-testid": "disorder_id" }}
      options={disorderData || []}
      mappingKeys={["_id", "disorder_name"]}
      size="small"
      className="form-control-bg"
    />
  );
};

describe("test select dropdown", () => {
  it("should create select button in screen", async () => {
    await sut();
    expect(screen.getByTestId("selectBoxTest")).toBeInTheDocument();
  });
});

describe("test select API dropdown", () => {
  it("should create select dropdown button in screen", async () => {
    await sutDisorder();
    expect(screen.getByTestId("disorder_id")).toBeInTheDocument();

    //   const element = screen.queryByTestId("disorder_id")
    //   await waitFor(() => {
    //     fireEvent.change(element, {
    //       target: { value: disorderData[0]._id },
    //     });
    //     console.debug(element.getAttribute("value"));
    // });
  });
});
