import { screen, render, waitFor } from "@testing-library/react";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/react-testing";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";
import TherapyPatientHomeworkIndex from "../pages/therapist/patient/view/[id]/homework";

jest.mock("../contexts/AuthContext");

const mocks = [];
mocks.push({
  request: {
    query: GET_PATIENTSESSION_DATA,
    variables: {
      pttherapyId: "9edcc1cd374e44ab84cf5721a73748d3",
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getPatientSessionList: [
        {
          _id: "03cc44ac14984bd186da60fa45d56069",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 1,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "c7df0ee3480646aabf64cc3908ea8f11",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 2,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "d6507aba90b94362b060d61db4ef90f3",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 3,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "f0401c5dcfe64776b3c44cc64d7a5810",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 4,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "4ec1226426b146be946810914c2b484e",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 5,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "409ec849f2db471380ae44e080f3c810",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 6,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "f0ee9a17b7ed4851a9796a42378a72f0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 7,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "fec69d0c314548bdb783686ffc4975f7",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 8,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "008fdf84aaaa48b987ba35d03b5c0554",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 9,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "c4f0eefc98c14e7c8294def07b9f26f1",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 10,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "dae1559d1e4f49f2a8d67c469ddbc81a",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 11,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "7d5039358e2447d6a9b316049e5641e0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 12,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "1daff993b2264df58c7f30d432bf7a60",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 13,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "6305f1b1fd09423e99d0e0ca593c0ae2",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 14,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "6852da9dafc94e83a0de79468cdc5b3d",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 15,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "8adbd8a5d8e54d27a0b01f007c5864a1",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 16,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "688f6ba54490452da4e084ceade1750b",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 17,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:09.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "75da9e3cff3d43eeb11250085243d7b9",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 18,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:10.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "91b27ccce95840fa9c8cd5db21677459",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 19,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:10.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "6dfc181b95f54d72810a7a65f528a799",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
          ptsession_no: 20,
          ptsession_status: 1,
          created_date: "2023-03-15T11:18:10.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
      ],
    },
  },
});

const sut = async () => {
  // system under test
  sessionStorage.setItem("patient_id", "4937a27dc00d48bf983fdcd4b0762ebd");
  sessionStorage.setItem("patient_name", "test");
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <TherapyPatientHomeworkIndex
          setTherapy={"9edcc1cd374e44ab84cf5721a73748d3"}
        />
      </SnackbarProvider>
    </MockedProvider>
  );
  // await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  // );
};

// tests
describe("Therapist client feedback list", () => {
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

  test("Renders homework data", async () => {
    await sut();
    await waitFor(async () => {
      const tiles = await screen.findAllByTestId("list-tile");
      expect(tiles.length).toEqual(20);
    });
  });
});
