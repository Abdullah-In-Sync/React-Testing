import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/styles";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { GET_PATH_RESOURCE_LIST } from "../graphql/query/resource";

import { GET_PATIENTTHERAPY_DATA } from "../graphql/query/common";
import theme from "../styles/theme/theme";
import ResourceList from "../pages/therapist/patient/view/[id]/resources";
import { DELETE_RESOURCE_BY_ID } from "../graphql/mutation/patient";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATH_RESOURCE_LIST,
    variables: {
      patientId: "d0f32c9e662745d5b60b8165eb8bdb55",
    },
  },
  result: {
    data: {
      getPatResourceList: [
        {
          _id: "c16333d05f204edc81cf9a94cc8f8be3",
          created_date: "2023-01-02T07:50:03.000Z",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          patient_share_filename: null,
          ptsharres_from: "2",
          ptsharres_status: "1",
          ptsharres_session: "7",
          ptsharres_subfrom: "3",
          resource_id: "9590f514-7a1e-458a-882a-b99a7a3136a0",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          template_id: null,
          template_response: null,
          updated_date: null,
          download_patient_filename_url: null,
          resource_data: [Array],
        },
        {
          _id: "ce465fdd296b46afac0192630c0ee34a",
          created_date: "2023-01-02T07:49:20.000Z",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          patient_share_filename: null,
          ptsharres_from: "2",
          ptsharres_status: "0",
          ptsharres_session: "7",
          ptsharres_subfrom: "3",
          resource_id: "14146ce8fb0d465895d8a320e41f384a",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          template_id: null,
          template_response: null,
          updated_date: null,
          download_patient_filename_url: null,
          resource_data: [Array],
        },
        {
          _id: "3fca7b889c8649f494421d47d94178f1",
          created_date: "2023-01-02T07:42:21.000Z",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          patient_share_filename: null,
          ptsharres_from: "2",
          ptsharres_status: "0",
          ptsharres_session: "7",
          ptsharres_subfrom: "3",
          resource_id: "d9847879-73f6-4bfc-ae86-209a74b52175",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          template_id: null,
          template_response: null,
          updated_date: null,
          download_patient_filename_url: null,
          resource_data: [Array],
        },
        {
          _id: "443d727e-88cb-40c5-bd0c-2daa94992767",
          created_date: "2023-01-02T07:41:28.000Z",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          patient_share_filename: "",
          ptsharres_from: "2",
          ptsharres_status: "0",
          ptsharres_session: "7",
          ptsharres_subfrom: "3",
          resource_id: "ecf43045-1f6d-4685-b64c-8d2c230788d0",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          template_id: null,
          template_response: null,
          updated_date: null,
          download_patient_filename_url: null,
          resource_data: [Array],
        },
        {
          _id: "fcd7ba1d92d349bca45eea3c9a76a62d",
          created_date: "2022-12-27T11:58:06.000Z",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          patient_share_filename: null,
          ptsharres_from: "2",
          ptsharres_status: "0",
          ptsharres_session: "1",
          ptsharres_subfrom: "2",
          resource_id: "af156214-8a7c-4567-8a93-bd91a940a73e",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          template_id: null,
          template_response: null,
          updated_date: null,
          download_patient_filename_url: null,
          resource_data: [Array],
        },
        {
          _id: "7b54bee5-13c0-42e1-9605-50b51b2da618",
          created_date: "2022-12-14T09:23:49.062Z",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          patient_share_filename: "",
          ptsharres_from: "1",
          ptsharres_status: "1",
          ptsharres_session: "1",
          ptsharres_subfrom: "1",
          resource_id: "beeef560-edcf-44a1-8b40-cf368a072646",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          template_id: null,
          template_response: `{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor","firstCellStyle":{"borderTopLeftRadius":8,"borderRightWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1}},{"type":"header","title":"are you veg ?","description":"about food","firstCellStyle":false,"lastCellStyle":{"borderTopRightRadius":8,"borderLeftWidth":0},"firstCellStyleForOnlyTwoCell":false}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book\\n\\n Updated by mobile","firstCellStyle":{"borderRadius":0,"borderRightWidth":0,"borderTopWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1,"borderRadius":0},"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":{"backgroundColor":"#F5F5F5"}},{"type":"answer","answerType":"boolean","answerValues":[],"patientAns":"Yes","firstCellStyle":false,"lastCellStyle":{"borderRadius":0,"borderLeftWidth":0,"borderTopWidth":0},"firstCellStyleForOnlyTwoCell":false,"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false}]},{"cells":[{"type":"answer","answerType":"list","answerValues":["test 1","test 2","test 3","test 4","test 5"],"patientAns":"test 1","firstCellStyle":{"borderRadius":0,"borderRightWidth":0,"borderTopWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1,"borderRadius":0},"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false},{"type":"answer","answerType":"text","answerValues":[],"patientAns":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book \\n\\ntest\\n\\ntest some - updated by mobile\\n\\nsome","firstCellStyle":false,"lastCellStyle":{"borderRadius":0,"borderLeftWidth":0,"borderTopWidth":0},"firstCellStyleForOnlyTwoCell":false,"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":{"backgroundColor":"#F5F5F5"}}]},{"cells":[{"type":"answer","answerType":"boolean","answerValues":[],"patientAns":"Yes","firstCellStyle":{"borderRadius":0,"borderRightWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1},"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false},{"type":"answer","answerType":"list","answerValues":["testing 1","testing 2","testing 3","testing 4","testing 5"],"patientAns":"testing 1","firstCellStyle":false,"lastCellStyle":{"borderBottomRightRadius":8,"borderLeftWidth":0},"firstCellStyleForOnlyTwoCell":false,"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false}]}]}`,
          updated_date: null,
          download_patient_filename_url: null,
          resource_data: [Array],
        },
        {
          _id: "d6f26a1a-4ebe-43f1-9551-3a4fe9f65e37",
          created_date: "2022-11-21T07:39:17.698Z",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
          patient_share_filename: "",
          ptsharres_from: "1",
          ptsharres_status: "1",
          ptsharres_session: "1",
          ptsharres_subfrom: "1",
          resource_id: "32337538-40eb-45d0-8598-3bde69f789e4",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          template_id: null,
          template_response: null,
          updated_date: null,
          download_patient_filename_url: null,
          resource_data: [Array],
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENTTHERAPY_DATA,
    variables: {
      patientId: "d0f32c9e662745d5b60b8165eb8bdb55",
    },
  },
  result: {
    data: {
      getPatientTherapy: [
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "7",
          pttherapy_status: 1,
          created_date: "2022-03-28T09:45:33.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "d8e8782354c84ca99ba2acda4a226482",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "4e110b3e7faa47c9be82540fe8e78fb0",
          patient_id: "d0f32c9e662745d5b60b8165eb8bdb55",
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

mocksData.push({
  request: {
    query: DELETE_RESOURCE_BY_ID,
    variables: { ptsharresId: "ce465fdd296b46afac0192630c0ee34a" },
  },
  result: {},
});
const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <ResourceList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist patient resource list page", () => {
  it("should render therapist patient resource detail", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      back: jest.fn(),
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "d0f32c9e662745d5b60b8165eb8bdb55",
      },
      ...mockRouter,
    }));
    await sut();

    await waitFor(async () => {
      const viewButton = await screen.findByTestId(
        "iconButton_view_ce465fdd296b46afac0192630c0ee34a"
      );
      expect(viewButton).toBeInTheDocument();
      fireEvent.click(viewButton);
      expect(mockRouter.push).toHaveBeenCalled();

      const attachmentButton = await screen.findByTestId(
        "iconButton_attachment_ce465fdd296b46afac0192630c0ee34a"
      );
      expect(attachmentButton).toBeInTheDocument();
      fireEvent.click(attachmentButton);
      expect(mockRouter.push).toHaveBeenCalled();
    });

    //
  });

  it("should delete therapist patient", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      back: jest.fn(),
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "d0f32c9e662745d5b60b8165eb8bdb55",
      },
      ...mockRouter,
    }));
    await sut();

    waitFor(async () => {
      const viewButton = await screen.findByTestId(
        "iconButton_delete_ce465fdd296b46afac0192630c0ee34a"
      );
      expect(viewButton).toBeInTheDocument();
      fireEvent.click(viewButton);
      await waitFor(() =>
        expect(screen.queryByTestId("confirmButton")).toBeInTheDocument()
      );

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await (async () => {
        expect(screen.queryByTestId("SuccessOkBtn")).toBeInTheDocument();
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Resource Deleted Successful")
        ).toBeInTheDocument();
      });

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("SuccessOkBtn"));
      });

      await waitFor(() =>
        expect(screen.queryByText("Resource Name")).toBeInTheDocument()
      );
    });
  });
});
