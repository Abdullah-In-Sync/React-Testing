import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { Feedback } from '../pages/admin/feedback';

import { GET_FEEDBACK_DATA, GET_ORG_DATA, GET_FEEDBACK_BY_ID } from "../graphql/query"
import { ADD_FEEDBACK, DELETE_FEEDBACK, UPDATE_FEEDBACK } from "../graphql/mutation";

import { mount } from 'enzyme'


function NotistackServiceMock() {
    return {
        enqueueSnackbar: () => jest.fn(),
        closeSnackbar: () => jest.fn(),
    };
}


let notistackServiceMock;
beforeEach(() => { 
    notistackServiceMock = NotistackServiceMock();
});

const mocks = [
    {
      request: {
        query: GET_ORG_DATA,
        variables: {
          queryString: 'javascript',
        },
      },
      result: {
          data: {
            getOrganizationData : [
                {
                    _id: "e7b5b7c0568b4eacad6f05f11d9c4884",
                    name: "dev-myhelp"
                },
                {
                    _id: "890baa07b0c847b2b883c9e1715e608e",
                    name: "resteasy"
                }
            ]
        }
      },
    },
    {
      request: {
        query: GET_FEEDBACK_BY_ID,
        variables: {
          ptthfeedbackIderapyId: "f98a6095ca524338973da5f20f8d0ad3"
        },
      },
      result: {
        data:  {
          getFeedbackQuestionById : [
            {
                _id: "f98a6095ca524338973da5f20f8d0ad3",
                answer_type: "list",
                created_date: "2022-06-23T08:26:33.663Z",
                org_id: "c557283d1b5e4d7abf19625bf268cdf8",
                question: "test1",
                session_no: 1,
                status: 1,
                updated_date: "2022-06-23T08:26:33.663Z",
                user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83"
            }
        ]
          }
      },
    },
    {
      request: {
        query: ADD_FEEDBACK,
        variables: { 
            feedQuesData: [
                {
                    org_id: "c557283d1b5e4d7abf19625bf268cdf8",
                    session_no: ["1","2"],
                    feedback_type: "session",
                    question: "test1",
                    answer_options: ["p", "q", "r", "s"],
                    answer_type: "list"
                },
                {
                    org_id: "c557283d1b5e4d7abf19625bf268cdf8",
                    session_no: ["1","2"],
                    feedback_type: "session",
                    answer_options: ["a", "b", "c", "d"],
                    question: "test2",
                    answer_type: "list"
                }
          ],
          sessionNo:1,
          feedbackType: "session"
      },
      result: {
          data: {
            adminCreateFeedback : [
                {
                    _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
                    user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                    org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                    session_no: 1,
                    question: "test1",
                    answer_type: "list",
                    status: "active",
                    created_date: "2022-07-09T15:39:07.173Z",
                    updated_date: "2022-07-09T15:39:07.173Z",
                    answer_options: [
                      "a",
                      "b",
                      "c",
                      "d"
                    ],
                    feedback_type: "session",
                    organization_name: "dev-myhelp"
                },
                {
                    _id: "6833a02d-2090-4816-91be-63aa8831b466",
                    user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                    org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                    session_no: 2,
                    question: "test1",
                    answer_type: "list",
                    status: "active",
                    created_date: "2022-07-09T15:39:07.397Z",
                    updated_date: "2022-07-09T15:39:07.397Z",
                    answer_options: [
                      "a",
                      "b",
                      "c",
                      "d"
                    ],
                    feedback_type: "session",
                    organization_name: "dev-myhelp"
                }
          ]
        }
      }
      },
    },
    {
        request: {
          query: GET_FEEDBACK_DATA,
          variables: {
            user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
            status: "active",
            pageNo: 1
          },
        },
        result: {
          data: {
            getAdminFeedbackList: [
                {
                    _id: "12274a23-4932-49b6-9eec-ae7f9f6b804d",
                    answer_type: "list",
                    created_date: "2022-06-23T08:26:33.663Z",
                    org_id: "c557283d1b5e4d7abf19625bf268cdf8",
                    question: "test1",
                    session_no: 1,
                    status: 1,
                    updated_date: "2022-06-23T08:26:33.663Z",
                    user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83"
                  },
                  {
                    _id: "8521b35e-9bbc-4f72-b054-c10935afd181",
                    answer_type: "list",
                    created_date: "2022-06-23T08:32:44.547Z",
                    org_id: "c557283d1b5e4d7abf19625bf268cdf8",
                    question: "test1",
                    session_no: 1,
                    status: 1,
                    updated_date: "2022-06-23T08:32:44.547Z",
                    user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83"
                  }
        ]
      }
        },
      },
      {
        request: {
          query: DELETE_FEEDBACK,
          variables: {
            feedbackId: "e6d1cdc7bf7f4e91807d0ac97698ca78",
            update: {
                status: "deleted",
              }
          },
        },
        result: {
          data:  {
            updateFeedbackQuestionById: 
            {
                _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
                answer_options: [
                  "p",
                  "q",
                  "r",
                  "s"
                ],
                answer_type: "radio",
                created_date: "2022-07-09T15:39:07.173Z",
                feedback_type: "session",
                org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                organization_name: null,
                question: "test1",
                session_no: 1,
                status: "deleted",
                updated_date: "2022-07-09T15:43:05.395Z",
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946"
            }
        }
        },
      },
      {
        request: {
          query: UPDATE_FEEDBACK,
          variables: {
            feedbackId: "e6d1cdc7bf7f4e91807d0ac97698ca78",
            update: {
                session_no: "1",
                question: "test1",
                feedback_type: "session",
                answer_type: "list",
                answer_options: ["a", "b", "c", "d"],
                status: "active",
              }
          },
        },
        result: {
          data:  {
            updateFeedbackQuestionById: 
            {
                _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
                answer_options: [
                  "p",
                  "q",
                  "r",
                  "s"
                ],
                answer_type: "radio",
                created_date: "2022-07-09T15:39:07.173Z",
                feedback_type: "session",
                org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                organization_name: null,
                question: "test1",
                session_no: 1,
                status: "deleted",
                updated_date: "2022-07-09T15:43:05.395Z",
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946"
            }
        }
        },
      }
    
  ];
  
describe('Admin feedback page', () => {
    test('Renders Admin feedback list', async () => {
    const { container } = render(
        <MockedProvider mocks={mocks} >
        <Feedback />
        </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(container).toMatchSnapshot();
    });
});
