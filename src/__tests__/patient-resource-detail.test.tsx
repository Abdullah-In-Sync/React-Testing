import ResourceDetailById from "../pages/patient/resource/[id]";

import {
  screen,
  render,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_TOKEN_DATA } from "../graphql/query/common";
import { GET_PATIENT_RESOURCE_DETAIL } from "../graphql/query/resource";


const useRouter = jest.spyOn(require('next/router'), 'useRouter');


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
      data: {
        getTokenData: {
          _id: "patient_id",
          user_type: "patient",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: "1",
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
          patient_data: {
            therapist_id: "therapist_id",
            _id:"patient_id"
          },
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: GET_PATIENT_RESOURCE_DETAIL,
      variables: {ptsharresId:"750a6993f61d4e58917e31e1244711f5"},
    },
    result: {
      data: {
        getResourceDetailById: [
          {
            _id: "750a6993f61d4e58917e31e1244711f5",
            ptsharres_session: "1",
            created_date: "2022-05-26T06:06:38.000Z",
            resource_data: [
              {
                resource_name: "test name",
                resource_desc: "test desc",
                resource_instruction: "test instruct",
                resource_references: "test reference",
              },
            ],
            disorder_detail: [
                {
                    _id: "467925dfc1d34c9e9eecd3cd915588d9",
                    disorder_name: "test disorder"
                }
            ],
            model_detail: [
                {
                    _id: "4e110b3e7faa47c9be82540fe8e78fb0",
                    model_name: "test mddel"
                }
            ]
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_PATIENT_RESOURCE_DETAIL,
      variables: {ptsharresId:"invalid-id"},
    },
    result: {
      data: {
        getResourceDetailById: null
      },
    },
  });

  return { mocks: _mocks };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
        <ResourceDetailById />
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};
describe("Render patient resource detail page", () => {
    beforeEach(() => {
        useRouter.mockClear();
    });

  // check for Patient Session Resource list
  test("Renders Patient resource detail screen", async () => {
    useRouter.mockImplementation(() => ({
        query: {
            id: "750a6993f61d4e58917e31e1244711f5"
        }
      }));
    await sut();
    await waitFor(() =>
        expect(screen.queryByTestId("patResourceDetail")).toBeInTheDocument()
    );
    expect(screen.queryByText("Description")).toBeInTheDocument();
    expect(screen.queryByText("Instructions")).toBeInTheDocument();
    expect(screen.queryByText("References")).toBeInTheDocument();
    expect(screen.queryByTestId("breadCrumb")).toBeInTheDocument();
    expect(screen.queryByTestId("backButton")).toBeInTheDocument();
    expect(screen.queryByTestId("iconsTarget")).toBeInTheDocument();
    expect(screen.queryByTestId("resourceName")).toBeInTheDocument();
  });

  test("Renders Patient resource detail screen with no data found", async () => {
    useRouter.mockImplementation(() => ({
        query: {
            id: "invalid-id"
        }
      }));
    await sut();
    await waitFor(() =>
        expect(screen.queryByText("No Data Found")).toBeInTheDocument()
    );    
    expect(screen.queryByTestId("no-data-found-patient-resource-detail")).toBeInTheDocument();
  });

});
