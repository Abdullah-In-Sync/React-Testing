import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_ADMIN_TOKEN_DATA } from "../graphql/query/common";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import { UPDATE_ADMIN_FORMULATION_BY_ID } from "../graphql/formulation/graphql";
import EditFormulation from "../pages/admin/resource/editformulation/[id]";
import {
  GET_FORMULATION_BY_ID,
  GET_UPLOAD_LOGO_URL,
} from "../graphql/query/resource";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

import * as s3 from "../lib/helpers/s3";

jest.mock("../contexts/AuthContext");
const file = new File(["hello"], "hello.png", { type: "image/png" });

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  // fetch token for user query
  _mocks.push({
    request: {
      query: GET_ADMIN_TOKEN_DATA,
      variables: {},
    },
    result: {
      data: {
        getTokenData: {
          _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: "1",
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
        },
      },
    },
  });

  // fetch formulation list query
  _mocks.push({
    request: {
      query: GET_FORMULATION_BY_ID,
      variables: { formulation_id: "750a6993f61d4e58917e31e1244711f5" },
    },
    result: {
      data: {
        getFormulationById: {
          _id: "f771c319-aba6-414c-ba4d-b5e55a4ed6d7",
          created_date: "2023-07-07T05:39:53.551Z",
          download_formulation_url:
            "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAWT4HUBJN%2F20230711%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230711T065523Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCWV1LXdlc3QtMSJHMEUCIAE66%2BvYJHbJvqIjK%2BDyCI3luNI2KUi2DLpE0koze%2FrSAiEAvsaP7oqB0ljpGP058BqhLnSUg5KFSstqeH9gV3Cgmz8q7QIIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDNHve%2F4lJzpLh7KR1SrBApObgLuO9E1QCaefPd77MpvXAk9Qo%2BhNF0oevH3FIo1tAiJl2oG6jWTHocqyqYRkXlUINqTaLStyRg6BzJBB2jxZg3ajyvVso4HpGSA73QeaBLPd3TSLUe%2B9K%2F3dVbYBOKgRdX4wR1gKaU5XBZKfh%2FLcYtD44vOw4igbgZ7J6Ut7QrLJSQEsxoglsyZgBMFohC87NGQUmEdNNTSyIBqp3%2BGig2I%2ByH0saNvJEsSGc7RN6WIC9DQipsT2A4nn2HtnKmDh42yLnyVHJCCuGL04%2FTMNz%2FO0pHoS9pA6dplxIKH6cv4mE4nMLhfLdsm0TavBz14UDHYP%2Bl4hXnl%2BA0rMctv8Od1CsBspmfcgYTZORHnvNpjqnPIuXDOW0Y8D4kVNipK1b9sNLMCoT54tmyd3m0mVxeVBEV2oi%2BnqRd35N6YjpDDm9LOlBjqeAXxU0wKlQnWQL%2FSX0Z0RLJArblYG%2Fo2Q%2FPSNSCFpUf3Ldo6IGGQOKwHXhMw9avgSbG8x0yC8fK6IfAwrlRH%2F5S%2BnncdOyKq2dOKzTSk6X%2BkOw7qGV4lX5wmzdAY7%2F1kyhFwC92FWrW7%2Bw8Lum6X7zT1fmj8PQRPs%2FLe07VAtSC1FiL3xbI%2F%2F5YScaGI45NBkTomK8SBSIlDyFcF4MdHN&X-Amz-Signature=b680234962e314d5a33970ab24b9ec7c64a67bc08277d67895c7474083d545fa&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png&x-id=GetObject",
          fav_for_detail: null,
          formulation_avail_for: '"\\"[1, 2]\\""',
          formulation_desc: "Punjab 512",
          formulation_img: "070622248__Screenshot 2023-03-16 at 5.21.17 PM.png",
          formulation_instruction: "Punjab 512",
          formulation_name: "Punjab 512",
          formulation_status: 1,
          formulation_type: 1,
          formulation_url:
            "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAWT4HUBJN%2F20230711%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230711T065523Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCWV1LXdlc3QtMSJHMEUCIAE66%2BvYJHbJvqIjK%2BDyCI3luNI2KUi2DLpE0koze%2FrSAiEAvsaP7oqB0ljpGP058BqhLnSUg5KFSstqeH9gV3Cgmz8q7QIIuP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDNHve%2F4lJzpLh7KR1SrBApObgLuO9E1QCaefPd77MpvXAk9Qo%2BhNF0oevH3FIo1tAiJl2oG6jWTHocqyqYRkXlUINqTaLStyRg6BzJBB2jxZg3ajyvVso4HpGSA73QeaBLPd3TSLUe%2B9K%2F3dVbYBOKgRdX4wR1gKaU5XBZKfh%2FLcYtD44vOw4igbgZ7J6Ut7QrLJSQEsxoglsyZgBMFohC87NGQUmEdNNTSyIBqp3%2BGig2I%2ByH0saNvJEsSGc7RN6WIC9DQipsT2A4nn2HtnKmDh42yLnyVHJCCuGL04%2FTMNz%2FO0pHoS9pA6dplxIKH6cv4mE4nMLhfLdsm0TavBz14UDHYP%2Bl4hXnl%2BA0rMctv8Od1CsBspmfcgYTZORHnvNpjqnPIuXDOW0Y8D4kVNipK1b9sNLMCoT54tmyd3m0mVxeVBEV2oi%2BnqRd35N6YjpDDm9LOlBjqeAXxU0wKlQnWQL%2FSX0Z0RLJArblYG%2Fo2Q%2FPSNSCFpUf3Ldo6IGGQOKwHXhMw9avgSbG8x0yC8fK6IfAwrlRH%2F5S%2BnncdOyKq2dOKzTSk6X%2BkOw7qGV4lX5wmzdAY7%2F1kyhFwC92FWrW7%2Bw8Lum6X7zT1fmj8PQRPs%2FLe07VAtSC1FiL3xbI%2F%2F5YScaGI45NBkTomK8SBSIlDyFcF4MdHN&X-Amz-Signature=05c85ce7552f8f4b96084ec35ca12d3431970b32eccfe28dabec05ac2635650d&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png&x-id=GetObject",
          org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
          template_data: "",
          template_id: "",
          updated_date: "2023-07-11T06:22:40.578Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "AdminFormulationData",
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: UPDATE_ADMIN_FORMULATION_BY_ID,
      variables: {
        formulation_id: "750a6993f61d4e58917e31e1244711f5",
        updateFormulation: {
          formulation_desc: "Punjab 512",
          formulation_instruction: "Punjab 512",
          formulation_name: "test",
          org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
          formulation_img: "invalid.pdf",
          formulation_avail_for: '"\\"\\\\\\"[1, 2]\\\\\\"\\""',
        },
      },
    },
    result: {
      data: {
        updateFormulationById: {
          _id: "f771c319-aba6-414c-ba4d-b5e55a4ed6d7",
          created_date: "2023-07-07T05:39:53.551Z",
          download_formulation_url:
            "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA3GHWP2OJ%2F20230711%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230711T075124Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCWV1LXdlc3QtMSJGMEQCIH4ff4uBqCBbCHxX2v0rA9Aw4f8PtX1%2B3ctg9BbiRJ4FAiBX8KT09OpYBbycqfBIq%2Fj3aQ%2BuzV6ygWIU%2F5WDtumSsSrtAgi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY3MzkyODI1ODExMyIMfcDpac6v5rFSIk8PKsECqYIb0goE1xHGRAGcgJSZ3Lt0TdQCLTTwoB73JoPXKF5jV%2BWTfdn%2Fotb16wMs%2BVfnOt3cn8tKdXn18szg7GTQ4CHVgJw1DUkJfffWPW1kcF%2FNgNAMZJN%2BcochqL052LhyAYW%2BxVoBwCZv8BbZuzUvmRXCNIdwYv7KfDru%2FhasASXFacWCbCkc2vhku2I1ONyLhc61TH9QX%2BAeQ95Z3yivXPX9Qmup%2B0C5hM3b055wLHCIY%2FnUTCTwkcJ3rmFqkHvZr9UeRHBUG33JWhdpRdUylWotMld2alPuUt7UnYtQfkloLTQzXx6a%2BrRei9DZe81rGghEKe9Wg0vsmVApvbw%2FVdRXNYHSejjOOU5%2BbJVsjIBj3rTGCebYng%2B5S1aGn8SRyAHU3NzaluGM9UKGLMR02YxSLVYIUFXfYdlmIZv3hsH8MOiTtKUGOp8BMlhSpJhVBkXhdsjcyaNVK6QJsCE%2FHkdyyyfivvOKyyFM4taX8PuOnDHVg9MPxiupOnH7yrgxmOn4VX2NSiRqxoxumI5LV3qc7shzn8KI2V6VefFTgT%2BZeZxe1DMPe4A0%2BalMvN6iL8fRRgJAJpdz0%2FmfvjNITrB1Lp6l8PyyN1JjRAtC8KeZ%2BrFr%2BMBPaQsdKTCzsQcG2aqCNS6aRIFb&X-Amz-Signature=65632de52be048a8d669d09cbfa687356d99a2a9dd5653cf02ac95c040c3e622&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png&x-id=GetObject",
          formulation_avail_for: '"\\"\\\\\\"[1, 2]\\\\\\"\\""',
          formulation_desc: "Punjab 512",
          formulation_img: "070622248__Screenshot 2023-03-16 at 5.21.17 PM.png",
          formulation_instruction: "Punjab 512",
          formulation_returnurl: null,
          formulation_name: "ABCD",
          formulation_status: 1,
          formulation_type: 1,
          formulation_url:
            "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA3GHWP2OJ%2F20230711%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230711T075124Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCWV1LXdlc3QtMSJGMEQCIH4ff4uBqCBbCHxX2v0rA9Aw4f8PtX1%2B3ctg9BbiRJ4FAiBX8KT09OpYBbycqfBIq%2Fj3aQ%2BuzV6ygWIU%2F5WDtumSsSrtAgi5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDY3MzkyODI1ODExMyIMfcDpac6v5rFSIk8PKsECqYIb0goE1xHGRAGcgJSZ3Lt0TdQCLTTwoB73JoPXKF5jV%2BWTfdn%2Fotb16wMs%2BVfnOt3cn8tKdXn18szg7GTQ4CHVgJw1DUkJfffWPW1kcF%2FNgNAMZJN%2BcochqL052LhyAYW%2BxVoBwCZv8BbZuzUvmRXCNIdwYv7KfDru%2FhasASXFacWCbCkc2vhku2I1ONyLhc61TH9QX%2BAeQ95Z3yivXPX9Qmup%2B0C5hM3b055wLHCIY%2FnUTCTwkcJ3rmFqkHvZr9UeRHBUG33JWhdpRdUylWotMld2alPuUt7UnYtQfkloLTQzXx6a%2BrRei9DZe81rGghEKe9Wg0vsmVApvbw%2FVdRXNYHSejjOOU5%2BbJVsjIBj3rTGCebYng%2B5S1aGn8SRyAHU3NzaluGM9UKGLMR02YxSLVYIUFXfYdlmIZv3hsH8MOiTtKUGOp8BMlhSpJhVBkXhdsjcyaNVK6QJsCE%2FHkdyyyfivvOKyyFM4taX8PuOnDHVg9MPxiupOnH7yrgxmOn4VX2NSiRqxoxumI5LV3qc7shzn8KI2V6VefFTgT%2BZeZxe1DMPe4A0%2BalMvN6iL8fRRgJAJpdz0%2FmfvjNITrB1Lp6l8PyyN1JjRAtC8KeZ%2BrFr%2BMBPaQsdKTCzsQcG2aqCNS6aRIFb&X-Amz-Signature=02e8e8029fe119cd358518246b67d54bf8e3ae4c8ab712a516ccb55afbb7f7e7&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D070622248__Screenshot%202023-03-16%20at%205.21.17%20PM.png&x-id=GetObject",
          updated_date: "2023-07-11T07:51:24.501Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FormulationData",
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: GET_UPLOAD_LOGO_URL,
      variables: {
        fileName: "invalid.pdf",
        imageFolder: "formulation",
      },
    },
    result: {
      data: {
        getFileUploadUrl: {
          upload_file_url:
            "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/images/invalid.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAVM5ZG3HA%2F20230111%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230111T045239Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCWV1LXdlc3QtMSJHMEUCIE7dk8MXHXt0s1zS9mYyI5FcRfTXndZIQnhWiveBOj04AiEA2tuDh0m1WxJtgG1Lp%2BwEdWqv3DR9zH5FN%2BLcdIGiU4oq7QIInv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDNFvVJ6v7acLMUp06CrBAqbjqQjc3Ti5Fd%2BkGz4wWVtyljkgqXnF1SdsDYT8AQ55P5kOJCjBmxzIYkliSUpwWJCQg37tS2YPyWHIlcTpApSzEdBTBHurASbVWItO3TvS7xWvc4Bvrz21Bte6TTHkHH3oJCmENxt%2B%2Fxa2NXstHRY74F32Rvm6H7nAViH7f9DpBSIuMzqQpAFeIMJKR2he%2BpFNmmYRV8ZUVHlrjo0Eq%2BymMRvlhC1PqZ358XiPKPGgkTokXRP%2Bnf%2B02niRNkKWhrSxth3oPlQ0TSEkPADJM3h7n80VeJ8O1wQInzwqwOI30H6Sv%2FjTmY2uEoCn9M4O51otmYsEiKrFGX9IlK4rmzuZgY%2FnqBAwCdAGfK8Ucml56W6vjZCrr%2FBeKdewATCyoyNrLLqkhOs0IHh%2BBWJEN2y%2FIGIsUOE2aO6FGGb6ql%2B7BjDsgPmdBjqeAQNgttAYGLvuTXfcginssgtpPrARYnBnNfLZzzBCIkjUdZGV9TqthZ8eEqz2krJvjcIe%2FVQLT26ICrfPtjJlQEmHA7Hj6bj4wDe9DgFf72aro8QRiATIn6LrCIDK8IIbluqiUiaAEE6r6wScMl1ibVtcAWt42FgA%2BgVtxzxZNN2IX4wKpgZBh3n8xx5zU%2Bi2BJdmBA9wGp3BQ3dCOkTG&X-Amz-Signature=d97a40cd5264c661ab74dd09b6f2f6f2c8c8f945fdd6a85f9035d9c869569d1a&X-Amz-SignedHeaders=host&x-id=PutObject",
          __typename: "uploadFileUrl",
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
      <SnackbarProvider>
        <EditFormulation />
      </SnackbarProvider>
    </MockedProvider>
  );
};
describe(" Formulation page", () => {
  beforeEach(() => {
    const mockRouter = {
      push: jest.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });
  // check for Patient Session Resource list

  it("should render complete edit formulation form and submit with valid data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
    }));

    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "invalid.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("formulation_name")).toHaveValue("Punjab 512");

      fireEvent.change(screen.queryByTestId("formulation_name"), {
        target: { value: "test" },
      });
      await waitFor(async () => {
        fireEvent.change(screen.getByTestId("resource_file_upload"), {
          target: { files: [file] },
        });
      });

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("editFormulationSubmitButton"));
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Formulation updated successfully!")
        ).toBeInTheDocument();
      });
    });
  });
});
