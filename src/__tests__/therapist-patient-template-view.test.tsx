import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { GET_PATH_RESOURCE_BY_ID } from "../graphql/query/resource";
import TherapistTemplatePage from "../pages/therapist/resource/view/[patientId]/[resourceId]";
import { THERAPIST_UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../graphql/mutation/resource";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
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

mocksData.push({
  request: {
    query: GET_PATH_RESOURCE_BY_ID,
    variables: {
      patientId: "9620ebf9279946678d4c5d64bdb973ed",
      resourceId: "10873f5d-91d6-4855-8aa5-56c48c51e68e",
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
          // eslint-disable-next-line prettier/prettier
          template_response:
            '{"nodes":[{"width":117,"height":47,"id":"dndnode_0","type":"selectorNode","position":{"x":59.30750201810424,"y":-50.70601716319272},"data":{"label":"Hello","description":"Description"},"selected":false,"dragging":false,"positionAbsolute":{"x":59.30750201810424,"y":-50.70601716319272}},{"width":117,"height":47,"id":"dndnode_1","type":"selectorNode","position":{"x":236.37648951359785,"y":1.723111663163266},"data":{"label":"2nd hello","description":"2nd description"},"selected":false,"dragging":false,"positionAbsolute":{"x":236.37648951359785,"y":1.723111663163266}}],"edges":[{"source":"dndnode_0","sourceHandle":null,"target":"dndnode_1","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0-dndnode_1c"}]}',
          _id: "a07c58d9-d37c-4e96-960d-103b663b67e4",
          resource_data: [
            {
              // eslint-disable-next-line prettier/prettier
              template_data:
                '{"nodes":[{"width":117,"height":47,"id":"dndnode_0","type":"selectorNode","position":{"x":59.30750201810424,"y":-50.70601716319272},"data":{"label":"Hello","description":"Description"},"selected":false,"dragging":false,"positionAbsolute":{"x":59.30750201810424,"y":-50.70601716319272}},{"width":117,"height":47,"id":"dndnode_1","type":"selectorNode","position":{"x":236.37648951359785,"y":1.723111663163266},"data":{"label":"2nd hello","description":"2nd description"},"selected":false,"dragging":false,"positionAbsolute":{"x":236.37648951359785,"y":1.723111663163266}}],"edges":[{"source":"dndnode_0","sourceHandle":null,"target":"dndnode_1","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0-dndnode_1c"}]}',
              template_id: "6434fe98582849e2152d631c",
              resource_name: "Jennie",
              resource_issmartdraw: "1",
              resource_url:
                "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/resources/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA62RQ54IH%2F20230502%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230502T122840Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIQC91F2j9hsY8eyxlRhoddiPvZAVg%2BpWoBkmUi709zdW5gIgNBKrCDVoFbIDYD8gbppq8AgWpazJWFpG6HLjEm31uugqiwMIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDKOVhBU%2BDVi5gxq4kCrfAjAK5ON0mO1gmyObNa5HPSbApWBoGc%2BDJ86r8H6pUpbsNhKRq4JUmLvCtd%2BqxbGUniDoLC2vmnNgDcrvCGwaCBTGAHXGcY7FmBoN6rBgzUTkJBuG0A32OOyDIizzlHxL7TQoHQlan%2F16wcuCccVVh5R7zCxzYZVSMckeFWL4VME5sw%2FRg0%2FzuBUvs5rVNGrbsgBB97ydYm752A7cqmqBnurwkOnAgNTbi%2BIHrMNgT6suqZDSFFlmQQZwoO4OiXi13P%2FGVD%2B8YLp%2FAYWfc86dpUprR6G8r3E1W%2BcezZGPH%2BiNQO5Kns2GssJBqXw77NS5w631p1bKVsgRw9ch8I2IOpJuT%2BwRflTxw37t60Em8dNATfkX5WjSX5OnpaW02VyNcdyHMOTOcGFqWG5vcMAGU%2Fs4ZIfxkkGmaF5T2IfcyMDHCQjvOZIS%2BwSjQRVqJqB%2BhcjtD06Rf2ndKz%2BfDXwORjDHg8SiBjqeAW0GIlhrftWaGNu8jiTkid5J2h18GliQYbIsOPbMUx5hvR1xQqGMhvRfMbm%2FevNm%2BdrCNAzABF%2B6Mu5IRSeJk8%2FwJUERqKKxF0Oy0YvxsinKqtRThQwhKxpZVCZJIOe%2BYp4a4gsjd4Y4NiBQk5RWwHD2KaAhRpXkAJzxaS3sJQ4nV5t6q08kvXIhT2sW%2F2qFLdhyaXBM85FSUEqdomD6&X-Amz-Signature=b4193e753ff461108f30038cc6dd74fdd3cbde983d22cdac1d3b0ef1fbb7b2a9&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D&x-id=GetObject",
              download_resource_url:
                "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/resources/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA62RQ54IH%2F20230502%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230502T122840Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIQC91F2j9hsY8eyxlRhoddiPvZAVg%2BpWoBkmUi709zdW5gIgNBKrCDVoFbIDYD8gbppq8AgWpazJWFpG6HLjEm31uugqiwMIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDKOVhBU%2BDVi5gxq4kCrfAjAK5ON0mO1gmyObNa5HPSbApWBoGc%2BDJ86r8H6pUpbsNhKRq4JUmLvCtd%2BqxbGUniDoLC2vmnNgDcrvCGwaCBTGAHXGcY7FmBoN6rBgzUTkJBuG0A32OOyDIizzlHxL7TQoHQlan%2F16wcuCccVVh5R7zCxzYZVSMckeFWL4VME5sw%2FRg0%2FzuBUvs5rVNGrbsgBB97ydYm752A7cqmqBnurwkOnAgNTbi%2BIHrMNgT6suqZDSFFlmQQZwoO4OiXi13P%2FGVD%2B8YLp%2FAYWfc86dpUprR6G8r3E1W%2BcezZGPH%2BiNQO5Kns2GssJBqXw77NS5w631p1bKVsgRw9ch8I2IOpJuT%2BwRflTxw37t60Em8dNATfkX5WjSX5OnpaW02VyNcdyHMOTOcGFqWG5vcMAGU%2Fs4ZIfxkkGmaF5T2IfcyMDHCQjvOZIS%2BwSjQRVqJqB%2BhcjtD06Rf2ndKz%2BfDXwORjDHg8SiBjqeAW0GIlhrftWaGNu8jiTkid5J2h18GliQYbIsOPbMUx5hvR1xQqGMhvRfMbm%2FevNm%2BdrCNAzABF%2B6Mu5IRSeJk8%2FwJUERqKKxF0Oy0YvxsinKqtRThQwhKxpZVCZJIOe%2BYp4a4gsjd4Y4NiBQk5RWwHD2KaAhRpXkAJzxaS3sJQ4nV5t6q08kvXIhT2sW%2F2qFLdhyaXBM85FSUEqdomD6&X-Amz-Signature=4c25c983e7c5137c2a59cf8c09c83b34b3eec6c41b9827caa6e2fcac9599ccf6&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D&x-id=GetObject",
              resource_desc: "",
              resource_instruction: "",
              resource_references: "",
              __typename: "Resource",
            },
          ],
          template_detail: {
            _id: "6434fe98582849e2152d631c",
            category: "Arrow Template",
            component_name: "ArrowTemplate",
            __typename: "Templates",
          },
          __typename: "Patshareresource",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_UPDATE_RESOURCE_TEMPLATE_RESPONSE,
    variables: {
      ptsharresId: "a07c58d9-d37c-4e96-960d-103b663b67e4",
      patientId: "9620ebf9279946678d4c5d64bdb973ed",
      update: {
        template_response: `{"nodes":[{"width":117,"height":47,"id":"dndnode_0","type":"selectorNode","position":{"x":59.30750201810424,"y":-50.70601716319272},"data":{"label":"Hello","description":"Description"},"selected":false,"dragging":false,"positionAbsolute":{"x":59.30750201810424,"y":-50.70601716319272}},{"width":117,"height":47,"id":"dndnode_1","type":"selectorNode","position":{"x":236.37648951359785,"y":1.723111663163266},"data":{"label":"2nd hello","description":"2nd description"},"selected":false,"dragging":false,"positionAbsolute":{"x":236.37648951359785,"y":1.723111663163266}}],"edges":[{"source":"dndnode_0","sourceHandle":null,"target":"dndnode_1","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0-dndnode_1c"}]}`,
      },
    },
  },
  result: {
    data: {
      updatePatientResourceById: {
        result: true,
        _id: "a07c58d9-d37c-4e96-960d-103b663b67e4",
      },
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

    // expect(await screen.findAllByText(/test name/i)).toHaveLength(2);

    const backButton = screen.getByTestId("backButton");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockRouter.back).toHaveBeenCalled();
  });
  it("should render therapist patient Arrow template", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        patientId: "9620ebf9279946678d4c5d64bdb973ed",
        resourceId: "10873f5d-91d6-4855-8aa5-56c48c51e68e",
      },
      ...mockRouter,
    }));
    await sut();

    // expect(await screen.findAllByText(/Jennie/i)).toHaveLength(2);

    const backButton = screen.getByTestId("backButton");
    expect(backButton).toBeInTheDocument();
    const arrowTemplate = await screen.findAllByTestId("arrow-template-test-1");
    expect(arrowTemplate.length).toEqual(2);
    fireEvent.click(backButton);
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("should render therapist patient response", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      back: jest.fn(),
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        patientId: "9620ebf9279946678d4c5d64bdb973ed",
        resourceId: "10873f5d-91d6-4855-8aa5-56c48c51e68e",
      },
      ...mockRouter,
    }));
    await sut();

    const submitButton = await screen.findByTestId("tableTemplateSubmit");

    fireEvent.click(submitButton);
    expect(
      await screen.findByText(
        /Patient worksheet has been submitted successfully./i
      )
    ).toBeInTheDocument();
    const cancelButton = await screen.findByTestId("tableTemplateCancel");
    fireEvent.click(cancelButton);
    expect(mockRouter.push).toHaveBeenCalled();
  });
});
