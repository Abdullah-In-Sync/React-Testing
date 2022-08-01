import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { Feedback } from '../pages/patient/feedback';
import { GET_PATIENTTHERAPY_DATA, GET_PATIENTFEEDBACKLIST_DATA,GET_TOKEN_DATA } from "../graphql/query/common"

const mocks = [
    {
      request: {
        query: GET_TOKEN_DATA,
        variables: {
          queryString: 'javascript',
        },
      },
      result: {
          data: {
            getTokenData : [
              {
              "_id":"9a6cdd23-0cef-4d4d-a94a-51d6896cabfd",
              "user_type":"patient",
              "parent_id":"73ddc746-b473-428c-a719-9f6d39bdef81",
              "perm_ids":"9,10,14,21,191,65,66",
              "user_status":"1",
              "created_date":"2021-12-20 16:20:55",
              "updated_date":"2021-12-20 16:20:55",
              }
          ]
        }
      },
    },
    {
        request: {
          query: GET_PATIENTFEEDBACKLIST_DATA,
          variables: {
            sessionNo: "1",
            feedbackType: "session"
          },
        },
        result: {
          data: [
            {
              "_id": "837878be-5cf9-4d1c-9593-8085a168946a",
              "user_id": "e36871a1-9628-4e31-ad44-dd918ee84d83",
              "org_id": "c557283d1b5e4d7abf19625bf268cdf8",
              "session_no": 1,
              "feedback_type": "session",
              "question": "test1",
              "answer_type": "list",
              "status": "active",
              "created_date": "2022-07-09T03:28:50.619Z",
              "updated_date": "2022-07-09T05:17:41.133Z"
            }
        ]
        },
      },
      {
        request: {
          query: GET_PATIENTTHERAPY_DATA,
          variables: {
            patientId: "abcdefghijkl",
          },
        },
        result: {
          data:  [
            {
              "patient_id" : "abcdefghijkl",
              "therapy_detail": {
                "therapy_name": "localhost",
                "_id": "305884c59f804bb6b93001f1bef958da"
              },
              "disorder_detail": {
                "_id": "449f01139fc44cc685c57068b585bdf4",
                "disorder_name": "local order"
              },
              "model_detail": {
                "_id": "b8cfa7724af247a987d7ce01366fae4c",
                "model_name": "local model"
              }
            }
          ]
        },
      }
    
  ];
  

test('renders patient feedback list', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Feedback />
    </MockedProvider>
  );

  await waitFor(() => new Promise((res) => setTimeout(res, 0)));

  expect(container).toMatchSnapshot();
});
