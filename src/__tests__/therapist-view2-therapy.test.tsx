import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { GET_PATIENTTHERAPY_DATA } from "../graphql/query/common";
import { useAppContext } from "../contexts/AuthContext";
import MainWraperTherapyPatient from "../pages/therapist/patient/view/[id]";
import { useRouter } from "next/router";
import TherapyMainComponent from "../pages/therapist/patient/view/[id]/therapy";

jest.mock("../contexts/AuthContext");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
// mocks
const mocksData = [];

export async function waitForPaint(times = 1): Promise<void> {
  for (let i = 0; i < times + 1; i++) {
    jest.advanceTimersByTime(1000);
    await Promise.resolve();
  }
}

mocksData.push({
  request: {
    query: GET_PATIENTTHERAPY_DATA,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getPatientTherapy: [
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "1",
          pttherapy_status: 1,
          created_date: "2022-05-29T15:17:42.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "45f52fa31a7f4884a9a5834f854480f8",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "4e110b3e7faa47c9be82540fe8e78fb0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "4e110b3e7faa47c9be82540fe8e78fb0",
            created_date: "2021-12-30 16:15:45",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "test model",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "6",
          pttherapy_status: 1,
          created_date: "2022-05-29T15:15:15.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "28abbd5cf240405c94ffd35b189c7297",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "1cd8f335168b49838e42ca2cda555ef4",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "1cd8f335168b49838e42ca2cda555ef4",
            created_date: "2022-02-25T16:22:45.000Z",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "testing",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "7",
          pttherapy_status: 1,
          created_date: "2022-05-29T04:37:57.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "ac8e81a741054bba9029ff02a3cc9bb9",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "1cd8f335168b49838e42ca2cda555ef4",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "1cd8f335168b49838e42ca2cda555ef4",
            created_date: "2022-02-25T16:22:45.000Z",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "testing",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "3",
          pttherapy_status: 1,
          created_date: "2022-03-10T09:16:22.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "5917a53226c74b74a4d082e4b864864e",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "4e110b3e7faa47c9be82540fe8e78fb0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "4e110b3e7faa47c9be82540fe8e78fb0",
            created_date: "2021-12-30 16:15:45",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "test model",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <MainWraperTherapyPatient
          children={""}
          patientId={undefined}
          loader={false}
        />
      </SnackbarProvider>
    </MockedProvider>
  );
  //   await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  //   );
};

const sut2 = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <TherapyMainComponent setTherapy={""} />
      </SnackbarProvider>
    </MockedProvider>
  );
  //   await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  //   );
};

describe("Therapist Resource page", () => {
  beforeEach(() => {
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
        therapist_data: {
          _id: "therapist_id",
          org_id: "myhelp",
        },
      },
    });
  });

  // check for Patient Session Resource list
  it("should render therapy dropdown", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("selectTherapy")).toBeInTheDocument();
      fireEvent.change(screen.queryByTestId("selectTherapy"), {
        target: { value: "a8bf94e308d04c598d0a06413cf30ef1" },
      });
      fireEvent.change(screen.queryByTestId("selectTherapy"), {
        target: { value: "a8bf94e308d04c598d0a06413cf30ef1" },
      });
      expect(screen.queryAllByTestId("SessionPanelItem").length).toBe(0);
    });
  });

  it("should render therapy main component.", async () => {
    await sut2();
    await waitFor(async () => {
      expect(screen.getByTestId("patientViewTherapyTab")).toBeInTheDocument();
    });
  });
});
