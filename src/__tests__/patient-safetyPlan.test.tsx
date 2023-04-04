import {
  screen,
  render,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import SafetyPlan from "../components/patient/therapyPages/safetyPlan";
import {
  ANSWER_SAFETY_PLAN_BY_PATIENT_ID,
  GET_PATIENT_SAFETY_PlANS,
} from "../graphql/SafetyPlan/graphql";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_SAFETY_PlANS,
  },
  result: {
    data: {
      getPatientSafetyPlans: [
        {
          name: "Test Plan Data check",
          description: "",
          questions: [
            {
              _id: "941f87ae-1413-40ef-bc88-3771d230cccb",
              patient_answer: "dfdsf",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you Test Failed ",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "description Baby Failed",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "963e60d8-eea4-4cb8-9092-910aef535b6c",
              patient_answer: "option1",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you dady",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 2",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "290d1744-528f-4c5c-bcb3-18dad406a30d",
              patient_answer: "sdfds",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "description 1",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "f451c080-8e69-4045-84e3-0e9d67209881",
              patient_answer: "option1",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you dady",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 2",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "b4135291-699c-4e35-a506-f9badecc4f34",
              patient_answer: "option1",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you dady",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 2",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "a95ad747-bb70-4917-a809-780db2f389d2",
              patient_answer: "sdfds",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you Test",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "description Baby",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "c45868b8-8577-4f0d-b1de-0221a91d0145",
              patient_answer: " option2",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you dady",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 2",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "0817ceb8-8e33-4ec9-a951-e2709e820ed1",
              patient_answer: " option2",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you dady",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 2",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
          ],
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "safety_plans",
          description: "plans safety",
          questions: [
            {
              _id: "c401a805-e989-4194-bff2-54f3f413d1cf",
              patient_answer: "I am finesss",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "Hows are you",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "description 1",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "babd0531-a7be-4b9e-b7a4-2bd5ba621561",
              patient_answer: "option1",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you dady",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 2",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "5814bf6d-7936-4a90-a7bc-9c799b4ed516",
              patient_answer: "dev answersss",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am dev question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "dev desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "1fb20b2d-6a16-40b2-ad40-7cc648669feb",
              patient_answer: "simple dev answer",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am dev question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "dev desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
          ],
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "safety_plans",
          description: "plans safety",
          questions: [],
          _id: "63d4db1c15a59b5752b93",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "new",
          description: "skfnk",
          questions: [],
          _id: "6afd8e29-980e-40de-a974-885f734859b8",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "test",
          description: "adf",
          questions: [],
          _id: "e7b34995-feb5-40b0-92f7-90c0ede24210",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "march plan",
          description: "plans safety",
          questions: [
            {
              _id: "6a92b17c-d275-4704-b18a-27d27dbfb0f5",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you Test Failed ",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "description Baby Failed",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "630d373c-e28c-4192-83d0-c1bd94dfa595",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you mom",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 200",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "499d87d5-52ef-4d4f-9685-2f12680f37f0",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am updated question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "new updated desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "d7010298-22f5-4003-9839-cbe8c170aaee",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am newly added question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "new added desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "5fe2c289-56c7-41a8-940b-624025dd600a",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am stupid added question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "new stupid desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "8642e4b8-59dd-441f-b65a-70a6bb493be1",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you dady",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 2",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
          ],
          _id: "e871988f-4896-4b71-ab1b-4f344c331fb2",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "march plan",
          description: "plans safety",
          questions: [
            {
              _id: "d4286e31-972c-4cf8-9caa-efb9e2c25e51",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am stupid question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "new updated stupid",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "bb96e5ef-7ff4-415f-8a7d-db980c865424",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "How are you mom",
              safety_ques_type: "2",
              safety_ques_status: "1",
              safety_additional_details: "description 200",
              safety_ques_typeoption: "option1, option2, option3",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "3f0021af-ff1a-4019-a8b2-635ede64f30a",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am updated question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "new updated desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "ea200d5e-0439-4776-aec9-5594df54409a",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am newly added question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "new added desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
            {
              _id: "ceb3812a-3f28-4265-837d-d828ed299c5e",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "i am stupid added question",
              safety_ques_type: "1",
              safety_ques_status: "1",
              safety_additional_details: "new stupid desc",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
          ],
          _id: "80e960d1-e568-4dc5-8858-6188441c0e5a",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "k;k;",
          description: "asadf asdf",
          questions: [
            {
              _id: "a31ce2d9-25f3-413c-8a54-fcce8b181d00",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "some",
              safety_ques_type: "custom",
              safety_ques_status: "1",
              safety_additional_details: " ;k;",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
          ],
          _id: "90f1e133-401f-435c-a3cb-824cc4007d25",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
        {
          name: "k;k;",
          description: "asadf asdf",
          questions: [
            {
              _id: "b380d6b6-671d-4ea1-9d5a-1410cd026ce2",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              safety_ques: "some",
              safety_ques_type: "custom",
              safety_ques_status: "1",
              safety_additional_details: " ;k;",
              safety_ques_typeoption: "",
              __typename: "patientSafetyPlanQuestions",
            },
          ],
          _id: "6a3c0047-29ac-4545-863e-4044ea4013f2",
          share_status: 1,
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ANSWER_SAFETY_PLAN_BY_PATIENT_ID,
    variables: {
      quesData:
        '[{"answer":"dfdsf","QuestionId":"941f87ae-1413-40ef-bc88-3771d230cccb"},{"answer":"option1","QuestionId":"963e60d8-eea4-4cb8-9092-910aef535b6c"},{"answer":"sdfds","QuestionId":"290d1744-528f-4c5c-bcb3-18dad406a30d"},{"answer":"option1","QuestionId":"f451c080-8e69-4045-84e3-0e9d67209881"},{"answer":"option1","QuestionId":"b4135291-699c-4e35-a506-f9badecc4f34"},{"answer":"sdfds","QuestionId":"a95ad747-bb70-4917-a809-780db2f389d2"},{"answer":" option2","QuestionId":"c45868b8-8577-4f0d-b1de-0221a91d0145"},{"answer":" option2","QuestionId":"0817ceb8-8e33-4ec9-a951-e2709e820ed1"}]',
    },
  },
  result: {
    data: {
      answerSafetyPlanByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "63d4db1c15a59b5752b93",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "6afd8e29-980e-40de-a974-885f734859b8",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "e7b34995-feb5-40b0-92f7-90c0ede24210",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "e871988f-4896-4b71-ab1b-4f344c331fb2",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "80e960d1-e568-4dc5-8858-6188441c0e5a",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "90f1e133-401f-435c-a3cb-824cc4007d25",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "6a3c0047-29ac-4545-863e-4044ea4013f2",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <SafetyPlan />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Patient Safety plans", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
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

  test("Renders safety plan data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(9);
  });

  it("Update safety plan data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(9);

    const firstAccordion = list[0];

    expect(
      within(firstAccordion).queryByTestId("submit-form")
    ).not.toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(
      within(firstAccordion).queryByTestId("submit-form")
    ).toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("submit-form"));

    const confirmButton = await screen.findByTestId(
      "editSafetyPlanConfirmButton"
    );

    fireEvent.click(confirmButton);

    expect(await screen.findByTestId("SuccessOkBtn")).toBeInTheDocument();

    await screen.findByTestId("SuccessOkBtn");

    fireEvent.click(screen.getByTestId("SuccessOkBtn"));
  });

  it("Info relapse plan ", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(9);

    const firstAccordion = list[0];

    expect(
      within(firstAccordion).queryByTestId("cancel-form")
    ).not.toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(
      within(firstAccordion).queryByTestId(
        "button-edit-icon_description Baby Failed"
      )
    ).toBeInTheDocument();

    fireEvent.click(
      within(firstAccordion).queryByTestId(
        "button-edit-icon_description Baby Failed"
      )
    );

    expect(screen.getByText("How are you Test Failed")).toBeInTheDocument();

    await waitFor(async () => {
      expect(
        screen.getByTestId("editTemplateCancelButton")
      ).toBeInTheDocument();
    });

    const confirmButton = await screen.findByTestId("editTemplateCancelButton");

    fireEvent.click(confirmButton);

    expect(list.length).toEqual(9);
  });

  it("Cancle relapse plan data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(9);

    const firstAccordion = list[0];

    expect(
      within(firstAccordion).queryByTestId("cancel-form")
    ).not.toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(
      within(firstAccordion).queryByTestId("cancel-form")
    ).toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("cancel-form"));

    expect(
      screen.getByText(
        "Are you sure you are canceling the response without submitting?"
      )
    ).toBeInTheDocument();

    const confirmButton = await screen.findByTestId("confirmButton");

    fireEvent.click(confirmButton);

    expect(
      screen.getByText("Response cancel successfully")
    ).toBeInTheDocument();
  });
});
