import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { GET_PATH_RESOURCE_BY_ID } from "../graphql/query/resource";
import ResourceDetail from "../pages/therapist/resource/[id]/[patientId]";
import theme from "../styles/theme/theme";

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
            '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor","firstCellStyle":{"borderTopLeftRadius":8,"borderRightWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1}},{"type":"header","title":"are you veg ?","description":"about food","firstCellStyle":false,"lastCellStyle":{"borderTopRightRadius":8,"borderLeftWidth":0},"firstCellStyleForOnlyTwoCell":false}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[],"patientAns":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book\\n\\n Updated by mobile","firstCellStyle":{"borderRadius":0,"borderRightWidth":0,"borderTopWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1,"borderRadius":0},"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":{"backgroundColor":"#F5F5F5"}},{"type":"answer","answerType":"boolean","answerValues":[],"patientAns":"Yes","firstCellStyle":false,"lastCellStyle":{"borderRadius":0,"borderLeftWidth":0,"borderTopWidth":0},"firstCellStyleForOnlyTwoCell":false,"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false}]},{"cells":[{"type":"answer","answerType":"list","answerValues":["test 1","test 2","test 3","test 4","test 5"],"patientAns":"test 1","firstCellStyle":{"borderRadius":0,"borderRightWidth":0,"borderTopWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1,"borderRadius":0},"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false},{"type":"answer","answerType":"text","answerValues":[],"patientAns":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book \\n\\ntest\\n\\ntest some - updated by mobile\\n\\nsome","firstCellStyle":false,"lastCellStyle":{"borderRadius":0,"borderLeftWidth":0,"borderTopWidth":0},"firstCellStyleForOnlyTwoCell":false,"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":{"backgroundColor":"#F5F5F5"}}]},{"cells":[{"type":"answer","answerType":"boolean","answerValues":[],"patientAns":"Yes","firstCellStyle":{"borderRadius":0,"borderRightWidth":0},"lastCellStyle":false,"firstCellStyleForOnlyTwoCell":{"borderRightWidth":1},"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false},{"type":"answer","answerType":"list","answerValues":["testing 1","testing 2","testing 3","testing 4","testing 5"],"patientAns":"testing 1","firstCellStyle":false,"lastCellStyle":{"borderBottomRightRadius":8,"borderLeftWidth":0},"firstCellStyleForOnlyTwoCell":false,"rowCellStyle":{"backgroundColor":"#F5F5F5"},"inputCellStyle":false}]}]}',
          _id: "7b54bee5-13c0-42e1-9605-50b51b2da618",
          resource_data: [
            {
              template_data:
                '{"rows":[{"cells":[{"type":"header","title":"your fav actor?","description":"about actor"},{"type":"header","title":"are you veg ?","description":"about food"}]},{"cells":[{"type":"answer","answerType":"text","answerValues":[]},{"type":"answer","answerType":"boolean","answerValues":[]}]},{"cells":[{"type":"answer","answerType":"list","answerValues":["test 1","test 2","test 3","test 4","test 5"]},{"type":"answer","answerType":"text","answerValues":[]}]},{"cells":[{"type":"answer","answerType":"boolean","answerValues":[]},{"type":"answer","answerType":"list","answerValues":["testing 1","testing 2","testing 3","testing 4","testing 5"]}]},{"cells":[{"type":"header","title":"test","description":"adfasdf"},{"type":"header","title":"test","description":" asdfasdf"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":"header","title":"test","description":"des"},{"type":"header","title":"test","description":"des"}]},{"cells":[{"type":""},{"type":""}]}]}',
              template_id: "63774edbc553fac5d6a9bd74",
              resource_name: "test name",
              resource_issmartdraw: "1",
              resource_url:
                "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/resources/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA7MWT3DFN%2F20230110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230110T072642Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCWV1LXdlc3QtMSJGMEQCICaTCUuc%2BYa%2B%2F9MB1571VqTOcgxwAD2gvF6W0ZXQd83qAiAAiNH21PUpMLWwA%2BE5yBSJSt1cCFhDqE9X3Gunu2pG%2FyqLAwiJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY3MzkyODI1ODExMyIMTdcimJSRTvrSzajOKt8CXSvbbahv90HNnR%2BF1DYrTUQTAy%2FKJk3lCNt9C0qg7fYo9%2Bx7ET6aYxeY4CGzoTLltvR7%2BFjP%2FaWKiIsMpK%2Ffyg%2Bl0SHnAhMpWpe7zynChrmVZWS8Z3b0SQ0aDwP7T474bTLK%2FbiiV4s1KfjP1MpwJJLi1noGYHruEUDD3GNvA946rvNpokGYCnu2jexl%2Bhom42HmKLl4EcCBwXY8hBf%2F4S13oFn3kd5dyDGAGgLopsG3QBUpV0C3JZIXMVoSKsTUtoq%2FAujo5Qdk2e9VLrbKl9zgy6h%2FqwwrA8I2M55%2FtYHjJPkomugAA%2B%2Fl3am1fZOsbpNgXRf5hfDvhHuPvdgB2lwp%2Fnu87Qwci7aTtMD7LCrpszBbtmSedUlZ7xWR2vMsqDwL%2BjztM8ZochLniv62qScfO9IzszIJNIKkt5oT4arE4%2FZksGXxyoRApQ4scBL189BQnB5UkF6VpC8gdpVpMLGm9J0GOp8BpSJLwvOOe06i4GrqlPFuUU%2BgswRv7H8o4nvPJfBpFofw4uyLEl9VMaOGZSaRO5D1%2FR838xEr2V0c16tZoT7DAxB0SZ29Smij%2FU1Q7Sl9Jvk7cInEpXj%2BXS0uzJBUbndEkkRtlI1d3AoxGn64Gcbnlrg6J9ftfDLQLDFTYDyUQz8K1ILb%2FJdUsjvAglkrOxBA%2BoEDwifZYwUzrxR2%2FZVv&X-Amz-Signature=a20f95c89c8b0c4c7a0d43467e6a95ee0a38ccc2e5ffc3f8e72df00deedcafba&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D&x-id=GetObject",
              download_resource_url:
                "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/resources/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA7MWT3DFN%2F20230110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230110T072642Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCWV1LXdlc3QtMSJGMEQCICaTCUuc%2BYa%2B%2F9MB1571VqTOcgxwAD2gvF6W0ZXQd83qAiAAiNH21PUpMLWwA%2BE5yBSJSt1cCFhDqE9X3Gunu2pG%2FyqLAwiJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY3MzkyODI1ODExMyIMTdcimJSRTvrSzajOKt8CXSvbbahv90HNnR%2BF1DYrTUQTAy%2FKJk3lCNt9C0qg7fYo9%2Bx7ET6aYxeY4CGzoTLltvR7%2BFjP%2FaWKiIsMpK%2Ffyg%2Bl0SHnAhMpWpe7zynChrmVZWS8Z3b0SQ0aDwP7T474bTLK%2FbiiV4s1KfjP1MpwJJLi1noGYHruEUDD3GNvA946rvNpokGYCnu2jexl%2Bhom42HmKLl4EcCBwXY8hBf%2F4S13oFn3kd5dyDGAGgLopsG3QBUpV0C3JZIXMVoSKsTUtoq%2FAujo5Qdk2e9VLrbKl9zgy6h%2FqwwrA8I2M55%2FtYHjJPkomugAA%2B%2Fl3am1fZOsbpNgXRf5hfDvhHuPvdgB2lwp%2Fnu87Qwci7aTtMD7LCrpszBbtmSedUlZ7xWR2vMsqDwL%2BjztM8ZochLniv62qScfO9IzszIJNIKkt5oT4arE4%2FZksGXxyoRApQ4scBL189BQnB5UkF6VpC8gdpVpMLGm9J0GOp8BpSJLwvOOe06i4GrqlPFuUU%2BgswRv7H8o4nvPJfBpFofw4uyLEl9VMaOGZSaRO5D1%2FR838xEr2V0c16tZoT7DAxB0SZ29Smij%2FU1Q7Sl9Jvk7cInEpXj%2BXS0uzJBUbndEkkRtlI1d3AoxGn64Gcbnlrg6J9ftfDLQLDFTYDyUQz8K1ILb%2FJdUsjvAglkrOxBA%2BoEDwifZYwUzrxR2%2FZVv&X-Amz-Signature=b777e749d0648cde6c4aef57185f2549e8b1b5b3cdbd2eb2612cb6f635ab683a&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D&x-id=GetObject",
              resource_desc: "test ",
              resource_instruction: "test ins",
              resource_references: "test ref",
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
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <ResourceDetail />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist patient resource detail page", () => {
  it("should render therapist patient resource detail", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      back: jest.fn(),
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
        patientId: "d0f32c9e662745d5b60b8165eb8bdb55",
      },
      ...mockRouter,
    }));
    await sut();

    expect(await screen.findAllByText(/test name/i)).toHaveLength(2);

    const backButton = screen.getByTestId("backButton");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(mockRouter.back).toHaveBeenCalled();

    const nextButton = screen.getByTestId("nextButton");
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(mockRouter.push).toHaveBeenCalled();

    //
  });
});
