import Resource from "../pages/patient/resource";

import {
  screen,
  render,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import { GET_PATIENT_RESOURCE_DATA } from "../graphql/query/resource";

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  // fetch patient Session Resource list query
  _mocks.push({
    request: {
      query: GET_PATIENT_RESOURCE_DATA,
    },
    result: {
      data: {
        getPatientResourceList: [
          {
              "_id": "750a6993f61d4e58917e31e1244711f5",
              "ptsharres_session": "1",
              "created_date": "2022-05-26T06:06:38.000Z",
              "resource_data": [
                  {
                      "resource_name": "Video clip",
                      "resource_type": "4"
                  }
              ]
          },
          {
              "_id": "d74a507c18e441e0888645932f607e9e",
              "ptsharres_session": "1",
              "created_date": "2022-05-26T06:06:28.000Z",
              "resource_data": [
                  {
                      "resource_name": "Video File Test3",
                      "resource_type": "2"
                  }
              ]
          },
          {
              "_id": "3969e793b7824d34b5164edccd9f3c67",
              "ptsharres_session": "1",
              "created_date": "2022-05-26T05:54:41.000Z",
              "resource_data": [
                  {
                      "resource_name": "Test Indi 29.4",
                      "resource_type": "1"
                  }
              ]
          },
          {
              "_id": "22969b0459f94e5d8269736d6f336fac",
              "ptsharres_session": "1",
              "created_date": "2022-04-18T15:48:08.000Z",
              "resource_data": [
                  {
                      "resource_name": "s3 pdf",
                      "resource_type": "1"
                  }
              ]
          },
          {
              "_id": "e9cab80f291e42a2bc9dd491bb57c8bc",
              "ptsharres_session": "1",
              "created_date": "2022-04-18T15:48:01.000Z",
              "resource_data": [
                  {
                      "resource_name": "s3 audio resource",
                      "resource_type": "3"
                  }
              ]
          }
      ],
      },
    },
  });

  return { mocks: _mocks };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <Resource />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};
describe("Patient Inforsheet Tab page", () => {
  // check for Patient Session Resource list
  test("Renders Patient Session Resource Tab list screen", async () => {
    await sut();
    expect(screen.queryByTestId("tableId")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(2)
    );
    expect(
      screen.queryByTestId("tableColumn_created_date")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("tableColumn_ptsharres_session")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("tableColumn_resource_data")
    ).toBeInTheDocument();

    expect(screen.queryByTestId("tableColumn_actions")).toBeInTheDocument();
  });
});
