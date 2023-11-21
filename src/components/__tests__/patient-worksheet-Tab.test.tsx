import {
  screen,
  render,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import WorkSheet from "../patient/workSheet";
import { GET_TOKEN_DATA } from "../../graphql/query/common";
import { GET_PATIENT_RESOURCE_DATA } from "../../graphql/query/resource";
import * as store from "../../utility/storage";

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
            _id: "patient_id",
          },
        },
      },
    },
  });

  // fetch patient Session Resource list query
  _mocks.push({
    request: {
      query: GET_PATIENT_RESOURCE_DATA,
    },
    result: {
      data: {
        getPatientResourceList: [
          {
            _id: "750a6993f61d4e58917e31e1244711f5",
            ptsharres_session: "1",
            created_date: "2022-05-26T06:06:38.000Z",
            resource_data: [
              {
                resource_name: "Video clip",
                resource_type: 4,
              },
            ],
          },
          {
            _id: "d74a507c18e441e0888645932f607e9e",
            ptsharres_session: "1",
            created_date: "2022-05-26T06:06:28.000Z",
            resource_data: [
              {
                resource_name: "Video File Test3",
                resource_type: 2,
              },
            ],
          },
          {
            _id: "3969e793b7824d34b5164edccd9f3c67",
            ptsharres_session: 1,
            created_date: "2022-05-26T05:54:41.000Z",
            resource_data: [
              {
                resource_name: "Test Indi 29.4",
                resource_type: 1,
              },
            ],
          },
          {
            _id: "22969b0459f94e5d8269736d6f336fac",
            ptsharres_session: "1",
            created_date: "2022-04-18T15:48:08.000Z",
            resource_data: [
              {
                resource_name: "s3 pdf",
                resource_type: 1,
              },
            ],
          },
          {
            _id: "e9cab80f291e42a2bc9dd491bb57c8bc",
            ptsharres_session: "1",
            created_date: "2022-04-18T15:48:01.000Z",
            resource_data: [
              {
                resource_name: "s3 audio resource",
                resource_type: 3,
              },
            ],
          },
        ],
      },
    },
  });

  return { mocks: _mocks };
};

const idCustomJwtToken =
  "eyJraWQiOiJsXC9BY3BKVlJ6VGFmM1U0akhlUm8rUWZVZmlLbE9hSUphT3hjS0htNk9Rbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiZjY0ODc2OS00MjE5LTQyYzctOGNhYy1iMjBiMTBjNWZlOTEiLCJjb2duaXRvOmdyb3VwcyI6WyJjdXN0b20iXSwicm9sZV9kZXRhaWwiOiJ7XCJfaWRcIjpcIjFhNWQxN2ViLWZlNWUtNDFiNi1iZmU3LWJkYjAxNzZmYzdkMlwiLFwibmFtZVwiOlwidGVzdGFjY2Vzc3Rva2VuX3JvbGVcIixcIm9yZ19pZFwiOlwiNTE3ZmEyMWE4MmMwNDY0YTkyYWFhZTkwYWUwZDVjNTlcIixcImFjY2Vzc2liaWxpdHlcIjpcInBhdGllbnRcIixcInBvc2l0aW9uXCI6XCJzaWRlYmFyXCIsXCJzdGF0dXNcIjoxLFwiY3JlYXRlZF9kYXRlXCI6XCIyMDIzLTExLTEwVDA4OjAxOjM5LjYwNlpcIixcInVwZGF0ZWRfZGF0ZVwiOlwiMjAyMy0xMS0xMFQwODowMTozOS42MDZaXCJ9IiwiY3VzdG9tOmZpcnN0bmFtZSI6IlBpeXVzaCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImF1dGhfdGltZSI6MTcwMDExMjI2NywiY3VzdG9tOmxhc3RuYW1lIjoiU2luZ2giLCJleHAiOjE3MDAxMTU4NjcsImlhdCI6MTcwMDExMjI2NywianRpIjoiNWU5YTgyYjgtMGVmYy00OTg3LWFkNjEtYzY4ZDZhNzk5ODcyIiwiZW1haWwiOiJwaXl1c2guc2luZ2grMUBteWhlbHAuY28udWsiLCJ0aGVyYXBpc3RfZGF0YSI6IiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJiZjY0ODc2OS00MjE5LTQyYzctOGNhYy1iMjBiMTBjNWZlOTEiLCJvcmlnaW5fanRpIjoiMDI3NGY2ZmItZmFlMS00ZmU1LTg4OTYtNGU3NDk0ZDNlODQxIiwicm9sZV9hY2Nlc3MiOiJbe1wiX2lkXCI6XCIwNmQzNjUxMS0zNGY0LTRlZDgtYjFlOC00NzVlMjc4YzM0OTNcIixcIm5hbWVcIjpcIkFncmVlbWVudFwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjViOWM1NDViLWFjMGEtNDlhNC04ZTk0LTFkMzhiODc1N2Q5NVwiLFwibmFtZVwiOlwiVmlld1wifV19LHtcIl9pZFwiOlwiZjhlMTlmYzYtZWIzYS00YjMwLTg2NzItNmFkYTM2YjFjY2Q0XCIsXCJuYW1lXCI6XCJGaWxlc1wiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjViOWM1NDViLWFjMGEtNDlhNC04ZTk0LTFkMzhiODc1N2Q5NVwiLFwibmFtZVwiOlwiVmlld1wifSx7XCJfaWRcIjpcImY3NzY2Y2ZiLWVhMzgtNGM5MS1iOTNhLWFhZDU4OTU2Njg2OVwiLFwibmFtZVwiOlwiRG93bmxvYWRcIn1dfSx7XCJfaWRcIjpcIjBjNWY0Zjc3LThhODItNDkyZi1hN2UyLWE1NzhmZDliMWIzNFwiLFwibmFtZVwiOlwiUmVsYXBzZVwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjc2YjljNDU0LTNkNjAtNGE5Zi1iOWJjLWU1Nzg4MTk2NWY5NFwiLFwibmFtZVwiOlwiQWRkXCJ9LHtcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCIxZjQ4NThlZC1kMmFhLTRmZDktODFlYi1lMGY3NjE5MThiZDRcIixcIm5hbWVcIjpcIlNhZmV0eSBQbGFuXCIsXCJwcml2aWxlZ2VzXCI6W3tcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9LHtcIl9pZFwiOlwiNzZiOWM0NTQtM2Q2MC00YTlmLWI5YmMtZTU3ODgxOTY1Zjk0XCIsXCJuYW1lXCI6XCJBZGRcIn1dfSx7XCJfaWRcIjpcImU3YjZkY2Y0LTNlMmYtNDE3Zi04ZTllLTk5YjY0NGIzOGY1MFwiLFwibmFtZVwiOlwiTWVhc3VyZXNcIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCI5ZDkwMTExNi0zYjAwLTQ2ZmEtOTg1MS03YWRhOTNlZDA2MGNcIixcIm5hbWVcIjpcIk1vbml0b3JzXCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiNDFhYzM0NzMtMzg1Ny00MzYxLWJkOTktMGZjMWUzMGQ5MzU2XCIsXCJuYW1lXCI6XCJBc3Nlc3NtZW50XCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiZGJmNmU4YzAtMjNkYi00NGE3LWEwZWEtNGVlNjE0NGM5MzBjXCIsXCJuYW1lXCI6XCJHb2Fsc1wiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcImM3MWM4YjQzLTY5M2YtNDIwMS04MWQxLTJjZjc2ZGUwNWQ5Y1wiLFwibmFtZVwiOlwiRm9ybXVsYXRpb25cIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCIxYTY2NjhhNy1lYzA0LTQ5MDQtOTczMC1hMTRhZTRhYzE1NDFcIixcIm5hbWVcIjpcIkhvbWV3b3JrXCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiYTc1MjU0Y2EtZTNmMy00MDFhLThlMjAtYmJiNTBiM2QzOWUzXCIsXCJuYW1lXCI6XCJGZWVkYmFja1wiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcIjNhOWEwNWIyLTMwYzMtNGYzYS1iYWVjLTFiZTc5NjA4NTU0NFwiLFwibmFtZVwiOlwiUmVzb3VyY2VcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCJmNzc2NmNmYi1lYTM4LTRjOTEtYjkzYS1hYWQ1ODk1NjY4NjlcIixcIm5hbWVcIjpcIkRvd25sb2FkXCJ9LHtcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCIzMzlhMzQzZi02M2M2LTQyNmYtODM1Ny1mMmZjNWEyNWFhMjBcIixcIm5hbWVcIjpcIlByb2ZpbGVcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn1dfV0iLCJhdWQiOiJxcG5sM25hNTRnc2VmZHZkb3VtMXM1MXRqIiwiZXZlbnRfaWQiOiI0OWY1YWJlZC1hNWVjLTQ0NDUtYWRjNS1iYmEwZDVkODk2NzkiLCJ0b2tlbl91c2UiOiJpZCIsIm5hbWUiOiJQaXl1c2ggU2luZ2giLCJwaG9uZV9udW1iZXIiOiIrOTE0NTE0NTQ1NDUxIiwicGF0aWVudF9kYXRhIjoie1wiX2lkXCI6XCI0OTM3YTI3ZGMwMGQ0OGJmOTgzZmRjZDRiMDc2MmViZFwiLFwibmFtZVwiOlwicmFuZG9tIG5hbWUgIFRlY2hcIixcImZpcnN0X25hbWVcIjpcInJhbmRvbSBuYW1lIFwiLFwibGFzdF9uYW1lXCI6XCJUZWNoXCIsXCJvcmdfaWRcIjpcIjUxN2ZhMjFhODJjMDQ2NGE5MmFhYWU5MGFlMGQ1YzU5XCIsXCJ0aGVyYXBpc3RfaWRcIjpcIjY4NjgwMmU1MTIzYTQ4MjY4MWE2ODBhNjczZWY3ZjUzXCJ9IiwiZmFtaWx5X25hbWUiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIifQ.PHKirYVtIOgu0xmktq2qPZRGXQ0UKpC7YBLKhmCqVPT3Oy5jx4l_R-XD2EL_zfILKEOT77Dg2v_xkjnhLX4ER3s8gIQTAuj3cQzq9RJK8QyvfcTsExPM_sC0Vix6o4aNfLGvxr-yVr6O3eQepu4Fpr1sxIVgLKrxgf8FjiDomDXHOOIZxtf0vuznkOS8igPvheFkNlY70pHkTOaQF2yY5UFsZ6wRjlRgZXYshONrRjkMutYYhSdks6eDERp6FAXGCVOGsPufZWSENAB_Sp4nL4Qio3HSFqm5gxezCZd7RxqKfZvSF1IpiEAPvLM364lwEQ4YYHugrrqlJF45g2doZA";

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <WorkSheet />
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
    jest.spyOn(store, "getSessionToken").mockReturnValue({
      userToken: "testToken",
      userType: "patient",
      userTokenId: idCustomJwtToken,
    });

    await sut();
    expect(screen.queryByTestId("tableId")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(1)
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
