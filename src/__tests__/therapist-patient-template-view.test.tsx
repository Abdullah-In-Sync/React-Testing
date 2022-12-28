import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { GET_RESOURCE_DETAIL } from "../graphql/query/resource";
import TherapistTemplatePage from "../pages/therapist/resource/view/[id]/index";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_RESOURCE_DETAIL,
    variables: { resourceId: "750a6993f61d4e58917e31e1244711f5" },
  },
  result: {
    data: {
      getResourceById: [
        {
          _id: "beeef560-edcf-44a1-8b40-cf368a072646",
          agenda_id: "",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          resource_avail_onlyme: "0",
          resource_avail_therapist: "1",
          category_id: "",
          resource_name: "test name",
          resource_type: 2,
          resource_desc: "test ",
          resource_instruction: "test ins",
          resource_references: "test ref",
          resource_filename: "",
          resource_url: "",
          download_resource_url: null,
          resource_issmartdraw: "1",
          template_id: "63774edbc553fac5d6a9bd74",
          template_data:
            '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[]},{"type":"answer","answerType":"boolean","answerValues":[]}]},{"cells":[{"type":"answer","answerType":"list","answerValues":["test 1","test 2","test 3","test 4","test 5"]},{"type":"answer","answerType":"text","answerValues":[]}]},{"cells":[{"type":"answer","answerType":"boolean","answerValues":[]},{"type":"answer","answerType":"list","answerValues":["testing 1","testing 2","testing 3","testing 4","testing 5"]}]},{"cells":[{"type":"header","title":"test","description":"adfasdf"},{"type":"header","title":"test","description":" asdfasdf"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":""},{"type":""}]}]}',
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
        id: "750a6993f61d4e58917e31e1244711f5",
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
