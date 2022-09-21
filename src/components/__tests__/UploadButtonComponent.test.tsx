import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";
import { GET_UPLOAD_RESOURCE_URL } from "../../graphql/query/resource";
import UploadButtonComponent from "../common/UploadButton/UploadButtonComponent";

const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  _mocks.push({
    request: {
      query: GET_UPLOAD_RESOURCE_URL,
      variables: {
        fileName: "test.png",
      },
    },
    result: {
      data: {
        preSignedData: {
          getUploadResourceUrl: {
            resource_upload: "https:myhelp.aws.com",
          },
        },
      },
    },
  });

  return { mocks: _mocks };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <UploadButtonComponent
        name="upload_file"
        onChange="javascript:void(0)"
        inputProps={{ "data-testid": "resource_file_upload" }}
      />
    </MockedProvider>
  );
};

describe("when rendered with a `upload button`", () => {
  it("should create upload button in screen", async () => {
    await sut();
    expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();
  });
});
