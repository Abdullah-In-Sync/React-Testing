import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { Feedback } from '../pages/therapist/feedback';
import { GET_PATIENTTHERAPY_DATA,GET_TOKEN_DATA } from "../graphql/query/common"
import { GET_PATIENTSESSION_DATA } from '../graphql/query/patient'
import { GET_THERAPISTFEEDBACKLIST_DATA } from '../graphql/query'

const mocks = [
    {
      request: {
        query: GET_TOKEN_DATA,
        variables: {
          queryString: 'javascript',
        },
      },
      result: {
        data: [
            {
            "_id":"4937a27dc00d48bf983fdcd4b0762ebd",
            "user_type":["patient"],
            "parent_id":"73ddc746-b473-428c-a719-9f6d39bdef81",
            "perm_ids":"9,10,14,21,191,65,66",
            "user_status":"1",
            "created_date":"2021-12-20 16:20:55",
            "updated_date":"2021-12-20 16:20:55",
            }
        ]
      },
    },
    {
        request: {
          query: GET_THERAPISTFEEDBACKLIST_DATA,
          variables: {
            patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
            sessionNo: 1,
            feedbackType: "session"
          },
        },
        result: {
          data: [
            {
              "_id": "9b04def7-c012-44ca-98f2-6060d90b9a25",
              "answer_options": [
                "p",
                "q",
                "r",
                "s"
              ],
              "answer_type": "list",
              "created_date": "2022-07-09T15:39:07.173Z",
              "feedback_ans": {
                "_id": "29e9e456-20cb-4d0d-81fb-1e718342f74c",
                "answer": "ans1",
                "created_date": "2022-07-09T15:53:28.900Z",
                "patient_id": "4937a27dc00d48bf983fdcd4b0762ebd",
                "question_id": "9b04def7-c012-44ca-98f2-6060d90b9a25",
                "status": "active",
                "therapist_id": "686802e5123a482681a680a673ef7f53",
                "updated_date": "2022-07-09T15:53:28.900Z"
              },
              "feedback_type": "session",
              "org_id": "517fa21a82c0464a92aaae90ae0d5c59",
              "question": "test1",
              "session_no": 1,
              "status": "active",
              "updated_date": "2022-07-09T15:43:05.395Z",
              "user_id": "9ea296b4-4a19-49b6-9699-c1e2bd6fc946"
            },
            {
                "_id": "9b04def7-c012-44ca-98f2-6060d90b9a25",
                "answer_options": "",
                "answer_type": "text",
                "created_date": "2022-07-09T15:39:07.173Z",
                "feedback_ans": {
                  "_id": "29e9e456-20cb-4d0d-81fb-1e718342f74c",
                  "answer": "ans1",
                  "created_date": "2022-07-09T15:53:28.900Z",
                  "patient_id": "4937a27dc00d48bf983fdcd4b0762ebd",
                  "question_id": "9b04def7-c012-44ca-98f2-6060d90b9a25",
                  "status": "active",
                  "therapist_id": "686802e5123a482681a680a673ef7f53",
                  "updated_date": "2022-07-09T15:53:28.900Z"
                },
                "feedback_type": "session",
                "org_id": "517fa21a82c0464a92aaae90ae0d5c59",
                "question": "test2",
                "session_no": 1,
                "status": "active",
                "updated_date": "2022-07-09T15:43:05.395Z",
                "user_id": "9ea296b4-4a19-49b6-9699-c1e2bd6fc946"
              }
        ]
        },
      },
      {
        request: {
          query: GET_PATIENTTHERAPY_DATA,
          variables: {
            patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
          },
        },
        result: {
          data:  { 
            getPatientTherapy: [
            {
              _id : "f98a6095ca524338973da5f20f8d0ad3",
              patient_id : "4937a27dc00d48bf983fdcd4b0762ebd",
              therapy_detail: {
                therapy_name: "localhost",
                _id: "305884c59f804bb6b93001f1bef958da"
              },
              disorder_detail: {
                _id: "449f01139fc44cc685c57068b585bdf4",
                disorder_name: "local order"
              },
              model_detail: {
                _id: "b8cfa7724af247a987d7ce01366fae4c",
                model_name: "local model"
              }
            }
          ]
        }
        },
      },
      {
        request: {
          query: GET_PATIENTSESSION_DATA,
          variables: {
            pttherapyId: "f98a6095ca524338973da5f20f8d0ad3",
          },
        },
        result: {
          data:  {
            getPatientSessionList : [
            {
                "_id": "bc1199d296b9437d8db350d6bad68666",
                "patient_id": "4937a27dc00d48bf983fdcd4b0762ebd",
                "therapist_id": "15b2fce928064732a6df4ffd3e513ed2",
                "pttherapy_id": "f98a6095ca524338973da5f20f8d0ad3",
                "ptsession_no": 1,
                "ptsession_status": 1,
                "created_date": "2022-03-25T13:37:07.000Z",
                "updated_date": null
              }
          ]
            }
        },
      }
    
  ];
  

test('renders Therapist feedback list', async () => {
  localStorage.setItem("patient_id","4937a27dc00d48bf983fdcd4b0762ebd");
  localStorage.setItem("patient_name","test");
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Feedback />
    </MockedProvider>
  );
  await waitFor(() => new Promise((res) => setTimeout(res, 0)));
  expect(container).toMatchSnapshot();
});
