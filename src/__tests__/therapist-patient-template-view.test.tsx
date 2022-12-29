import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { GET_PATH_RESOURCE_BY_ID } from "../graphql/query/resource";
import TherapistTemplatePage from "../pages/therapist/resource/view/[patientId]/[resourceId]";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATH_RESOURCE_BY_ID,
    variables: {
      patientId: "d0f32c9e662745d5b60b8165eb8bdb55",
      resourceId: "750a6993f61d4e58917e31e1244711f5",
    },
  },
  result: {
    data: {
      getPatResourceById: [
        {
          ptsharres_session: "1",
          ptsharres_status: "1",
          created_date: "2022-12-14T09:23:49.062Z",
          ptsharres_from: "1",
          ptsharres_subfrom: "1",
          share_from: "dbdd2446-093c-4ec4-abc9-df275634a817",
          resource_upload: null,
          patient_share_filename: "",
          download_patient_filename_url: null,
          template_id: null,
          template_response:
            '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book\\n\\ntest"},{"type":"answer","answerType":"boolean","answerValues":[],"patientAns":"Yes"}]},{"cells":[{"type":"answer","answerType":"list","answerValues":["test 1","test 2","test 3","test 4","test 5"],"patientAns":"test 3"},{"type":"answer","answerType":"text","answerValues":[],"patientAns":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book \\n\\ntest\\n\\ntest some\\n\\nsome"}]},{"cells":[{"type":"answer","answerType":"boolean","answerValues":[],"patientAns":"Yes"},{"type":"answer","answerType":"list","answerValues":["testing 1","testing 2","testing 3","testing 4","testing 5"],"patientAns":"testing 4"}]}]}',
          _id: "7b54bee5-13c0-42e1-9605-50b51b2da618",
          resource_data: [
            {
              template_data:
                '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[]},{"type":"answer","answerType":"boolean","answerValues":[]}]},{"cells":[{"type":"answer","answerType":"list","answerValues":["test 1","test 2","test 3","test 4","test 5"]},{"type":"answer","answerType":"text","answerValues":[]}]},{"cells":[{"type":"answer","answerType":"boolean","answerValues":[]},{"type":"answer","answerType":"list","answerValues":["testing 1","testing 2","testing 3","testing 4","testing 5"]}]},{"cells":[{"type":"header","title":"test","description":"adfasdf"},{"type":"header","title":"test","description":" asdfasdf"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":""},{"type":""}]}]}',
              template_id: "63774edbc553fac5d6a9bd74",
              resource_name: "test name",
              resource_issmartdraw: "1",
              __typename: "Resource",
            },
          ],
          template_detail: {
            _id: "63774edbc553fac5d6a9bd74",
            category: "journal",
            component_name: "TemplateTable",
            __typename: "Templates",
          },
          __typename: "Patshareresource",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <TherapistTemplatePage />
      </SnackbarProvider>
    </MockedProvider>
  );
};

describe("Therapist view template page", () => {
  it("should render therapist patient template", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        patientId: "d0f32c9e662745d5b60b8165eb8bdb55",
        resourceId: "750a6993f61d4e58917e31e1244711f5",
      },
      ...mockRouter,
    }));
    await sut();

    expect(await screen.findAllByText(/test name/i)).toHaveLength(2);

    const backButton = screen.getByTestId("backButton");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
