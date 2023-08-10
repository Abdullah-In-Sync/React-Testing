import ResourceById from "../pages/therapist/resource/[id]";

import {
  screen,
  render,
  waitForElementToBeRemoved,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_THERAPIST_TOKEN_DATA } from "../graphql/query/common";
import { GET_RESOURCE_DETAIL } from "../graphql/query/resource";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

jest.mock("../contexts/AuthContext");
const pushMock = jest.fn();

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  // fetch token for user query
  _mocks.push({
    request: {
      query: GET_THERAPIST_TOKEN_DATA,
      variables: {},
    },
    result: {
      data: {
        getTokenData: {
          _id: "some-therapist-id",
          user_type: "therapist",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: "1",
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
          therapist_data: {
            _id: "therapist_id",
            org_id: "myhelp",
          },
        },
      },
    },
  });

  _mocks.push(
    {
      request: {
        query: GET_RESOURCE_DETAIL,
        variables: { resourceId: "750a6993f61d4e58917e31e1244711f5" },
      },
      result: {
        data: {
          getResourceById: [
            {
              _id: "750a6993f61d4e58917e31e1244711f5",
              resource_name: "test name",
              resource_desc: "test desc",
              resource_instruction: "test instruct",
              resource_references: "test reference",
              resource_url: "http://google.com",
              download_resource_url: "http://google.com",
              disorder_detail: {
                _id: "467925dfc1d34c9e9eecd3cd915588d9",
                disorder_name: "test disorder",
              },
              model_detail: {
                _id: "4e110b3e7faa47c9be82540fe8e78fb0",
                model_name: "test mddel",
              },
            },
          ],
        },
      },
    },
    {
      request: {
        query: GET_RESOURCE_DETAIL,
        variables: { resourceId: "e2114714-18dc-4c91-83e0-7cbd5c98c33e" },
      },
      result: {
        data: {
          getResourceById: [
            {
              _id: "e2114714-18dc-4c91-83e0-7cbd5c98c33e",
              agenda_id: "",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              resource_avail_onlyme: "0",
              resource_avail_therapist: "1",
              category_id: "",
              resource_name: "Testing Template view",
              resource_type: 1,
              resource_desc: "a",
              resource_instruction: "",
              resource_references: "",
              resource_filename: "",
              resource_url: "",
              download_resource_url: null,
              resource_issmartdraw: "1",
              template_id: "63774edbc553fac5d6a9bd74",
              template_data:
                '{"rows":[{"cells":[{"type":"answer","answerType":"text","answerValues":[]},{"type":"answer","answerType":"text","answerValues":[]}]},{"cells":[{"type":"header","title":"Jo margi dal lo"},{"type":"header","title":"Jo timhe accha lage"}]}]}',
              disorder_detail: {
                _id: "4af58b3923074fd2bd111708e0145e2a",
                disorder_name: "28th amar disorder",
                __typename: "Disorder",
              },
              model_detail: {
                _id: "bd0d22a6c2a44124a524699c74e5909c",
                model_name: "28th amar model",
                __typename: "DisorderModel",
              },
              template_detail: {
                component_name: "TemplateTable",
                name: "Table Template",
                __typename: "Templates",
              },
              __typename: "ResourceDetail",
            },
          ],
        },
      },
    },
    {
      request: {
        query: GET_RESOURCE_DETAIL,
        variables: { resourceId: "invalid-id" },
      },
      result: {
        data: {
          getResourceById: null,
        },
      },
    },
    {
      request: {
        query: GET_RESOURCE_DETAIL,
        variables: { resourceId: "750a6993f61d4e58917e31e1244711f4" },
      },
      result: {
        data: {
          getResourceById: [
            {
              _id: "750a6993f61d4e58917e31e1244711f4",
              resource_name: "test name",
              resource_desc: "test desc",
              resource_instruction: "test instruct",
              resource_references: "test reference",
              resource_url: null,
              download_resource_url: null,
              disorder_detail: {
                _id: "467925dfc1d34c9e9eecd3cd915588d9",
                disorder_name: "test disorder",
              },
              model_detail: {
                _id: "4e110b3e7faa47c9be82540fe8e78fb0",
                model_name: "test mddel",
              },
            },
          ],
        },
      },
    }
  );

  return { mocks: _mocks };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <ResourceById />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};
describe("Render therapist resource detail page", () => {
  beforeEach(() => {
    useRouter.mockClear();
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });

  // check for Patient Session Resource list
  test("Renders Therapist resource detail screen", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
    }));
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("therapistResourceDetail")
      ).toBeInTheDocument()
    );
    expect(screen.queryByText("Description")).toBeInTheDocument();
    expect(screen.queryByText("Instructions")).toBeInTheDocument();
    expect(screen.queryByText("References")).toBeInTheDocument();
    expect(screen.queryByTestId("breadCrumb")).toBeInTheDocument();
    expect(screen.queryByTestId("backButton")).toBeInTheDocument();
    expect(screen.queryByTestId("iconsTarget")).toBeInTheDocument();
    expect(screen.queryByTestId("resourceName")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("viewUrl"));
    expect(screen.queryByTestId("viewUrl")).toHaveAttribute(
      "href",
      "http://google.com"
    );
    fireEvent.click(screen.queryByTestId("downloadUrl"));
    expect(screen.queryByTestId("viewUrl")).toHaveAttribute(
      "href",
      "http://google.com"
    );
  });

  test("Renders Therapist resource detail screen with no data found", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "invalid-id",
      },
    }));
    await sut();
    await waitFor(() =>
      expect(screen.queryByText("No Data Found")).toBeInTheDocument()
    );
    expect(
      screen.queryByTestId("no-data-found-patient-resource-detail")
    ).toBeInTheDocument();
  });

  test("Renders therapist resource detail screen with file urls", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f4",
      },
    }));
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("therapistResourceDetail")
      ).toBeInTheDocument()
    );
    expect(screen.queryByText("Description")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("viewUrl"));
    expect(screen.queryByTestId("viewUrl")).toHaveAttribute("href", "#");
    fireEvent.click(screen.queryByTestId("downloadUrl"));
    expect(screen.queryByTestId("viewUrl")).toHaveAttribute("href", "#");
  });

  test("View Template if resource is template resource", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "e2114714-18dc-4c91-83e0-7cbd5c98c33e",
      },
      push: pushMock,
    }));
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("therapistResourceDetail")
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.queryByTestId("viewTemplate"));
    expect(pushMock).toHaveBeenCalledWith(
      "/template/preview/e2114714-18dc-4c91-83e0-7cbd5c98c33e"
    );
  });
});
