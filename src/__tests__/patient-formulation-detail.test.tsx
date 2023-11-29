import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../contexts/AuthContext";
import {
  GET_FORMULATION_BY_SHARE_ID,
  UPDATE_PAT_FORMULATION_BY_ID,
} from "../graphql/formulation/graphql";
import PatientEditTemplatePage from "../pages/patient/formulation/edit/[id]";
import theme from "../styles/theme/theme";
import * as store from "../utility/storage";
const useRouter = jest.spyOn(require("next/router"), "useRouter");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

// formulation detail
mocksData.push({
  request: {
    query: GET_FORMULATION_BY_SHARE_ID,
    variables: {
      ptsharresId: "46cb932a4c6346268ec4c13009cdd1b5",
    },
  },
  result: {
    data: {
      getFormulationByShareId: {
        data: [
          {
            _id: "46cb932a4c6346268ec4c13009cdd1b5",
            created_date: "2023-07-27T03:46:30.009Z",
            formulation_data: [
              {
                user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
                formulation_url:
                  "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAS2SR42YS%2F20230727%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230727T090223Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIAcvVekGThLcCP8PG0F%2FPmzEenmiPLjGdbl6cNHqbtyRAiEAqwPIvAfGFXKF2L5uCd2gWL6zWYW49eacxhGb0qSvJZMq9gIIWhABGgw2NzM5MjgyNTgxMTMiDMLEsVh6a7Xd0NCfFyrTAsnaGrMErwI4ZD2L6WxtPDXHTmfvrlF7Iln9zLfqy2tZs%2FaZX0hbHbGXkfYSi7yByqKKCe3CdIOy7PdZXSaFe7zdHQHAq89kOhROwJC58O8m40Vfpo40G7TDQWTsXz12uLzT%2FFInRwcygC1a%2BDIoQ%2BowFgP3UNxPsx0hqvFNbG5bYSZQTRcjrpTFFz4MI19S1KRpejOlXXm1cTfD8DLdjawht%2BuCm4Jvy2eMMjxUBAeF1Q71W9vF6iTLmUO2s7VGrYGiKLQwRnqFxVCYQAG0oFRtvPD%2FwrbkOChrmSOKkVbBphVp49wqJjj1B4T78Ufn4%2FuS4bGrZk8YMNVhDv5Qnhi9WlC8pUDkBWkjNapWgfKcYcA3YQ5IOdLwIoB7qQZwq5YBuA2mdEvtYpONSYSs1zq2sTlYEW05sLf7v4ylUiu3aBhVJaqXUzAIKdzXDkDlixsN0zCF1YimBjqeAanVMkJCoWJ3CnNmWqZO5SsOPr23V%2BgDqeTtAkRBHLs6rLc%2BSbRhTMo4JWSvkRrDrbfBuTNjJzJrzL9nPKIKKSn2FgnaABO3jdEzYzkMWahaNKAJVQtDtMYI3yGit3omHxkYUIfGI5wCrv%2Bu6Sm7kKqZ0iXdLwFGV9XLC1c2im0SE0ZT%2FnUkLIYX7nRHUmzEuj65CMasOjM6o68wrSUd&X-Amz-Signature=1e5cd6e2980df6d917afab1c3de4bd014af314ffa936c3b3fa9760a2268b4f56&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D&x-id=GetObject",
                formulation_type: 1,
                formulation_status: 1,
                formulation_returnurl: null,
                formulation_name: "Test-Arrow-temp",
                formulation_instruction: "",
                formulation_img: "",
                formulation_desc: "Test description",
                formulation_avail_for: "[1, 2]",
                download_formulation_url:
                  "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAS2SR42YS%2F20230727%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230727T090223Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIAcvVekGThLcCP8PG0F%2FPmzEenmiPLjGdbl6cNHqbtyRAiEAqwPIvAfGFXKF2L5uCd2gWL6zWYW49eacxhGb0qSvJZMq9gIIWhABGgw2NzM5MjgyNTgxMTMiDMLEsVh6a7Xd0NCfFyrTAsnaGrMErwI4ZD2L6WxtPDXHTmfvrlF7Iln9zLfqy2tZs%2FaZX0hbHbGXkfYSi7yByqKKCe3CdIOy7PdZXSaFe7zdHQHAq89kOhROwJC58O8m40Vfpo40G7TDQWTsXz12uLzT%2FFInRwcygC1a%2BDIoQ%2BowFgP3UNxPsx0hqvFNbG5bYSZQTRcjrpTFFz4MI19S1KRpejOlXXm1cTfD8DLdjawht%2BuCm4Jvy2eMMjxUBAeF1Q71W9vF6iTLmUO2s7VGrYGiKLQwRnqFxVCYQAG0oFRtvPD%2FwrbkOChrmSOKkVbBphVp49wqJjj1B4T78Ufn4%2FuS4bGrZk8YMNVhDv5Qnhi9WlC8pUDkBWkjNapWgfKcYcA3YQ5IOdLwIoB7qQZwq5YBuA2mdEvtYpONSYSs1zq2sTlYEW05sLf7v4ylUiu3aBhVJaqXUzAIKdzXDkDlixsN0zCF1YimBjqeAanVMkJCoWJ3CnNmWqZO5SsOPr23V%2BgDqeTtAkRBHLs6rLc%2BSbRhTMo4JWSvkRrDrbfBuTNjJzJrzL9nPKIKKSn2FgnaABO3jdEzYzkMWahaNKAJVQtDtMYI3yGit3omHxkYUIfGI5wCrv%2Bu6Sm7kKqZ0iXdLwFGV9XLC1c2im0SE0ZT%2FnUkLIYX7nRHUmzEuj65CMasOjM6o68wrSUd&X-Amz-Signature=f7b45ee12f210ce605dc4ecf1b98db2b2c3f48dc7d7689d3002781d34da5ab11&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D&x-id=GetObject",
                template_data:
                  '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":721,"y":127.4375},"data":{"label":"Test 2","description":"Desc2"},"style":{"width":298,"height":248},"positionAbsolute":{"x":721,"y":127.4375},"selected":true,"dragging":false},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":109.84226659805233,"y":163.7575846343691},"data":{"label":"Test","description":"Desc"},"style":{"width":298,"height":248},"selected":false,"positionAbsolute":{"x":109.84226659805233,"y":163.7575846343691},"dragging":false}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}',
                __typename: "FormulationData",
              },
            ],
            template_detail: {
              component_name: "ArrowTemplate",
              category: "Arrow Template",
              name: "Flow Template",
              __typename: "Templates",
            },
            formulation_id: "e9756dde-78f8-4053-a5ca-5ab6fd5df71b",
            patient_id: "47aedf8a20344f68b8f064c94160046d",
            share_from: "686802e5123a482681a680a673ef7f53",
            updated_date: "2023-07-27T09:00:03.313Z",
            template_response:
              '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":721,"y":127.4375},"data":{"label":"Test 2","description":"Desc2","patientResponse":"Test Res"},"style":{"width":298,"height":248},"positionAbsolute":{"x":721,"y":127.4375},"selected":true,"dragging":false},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":109.84226659805233,"y":163.7575846343691},"data":{"label":"Test","description":"Desc","patientResponse":"test res"},"style":{"width":298,"height":248},"selected":false,"positionAbsolute":{"x":109.84226659805233,"y":163.7575846343691},"dragging":false}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}',
            __typename: "Patshareformulation",
          },
        ],
        result: true,
      },
    },
  },
});

// doc formulation
mocksData.push({
  request: {
    query: GET_FORMULATION_BY_SHARE_ID,
    variables: {
      ptsharresId: "46cb932a4c6346268ec4c13009cdd1b6",
    },
  },
  result: {
    data: {
      getFormulationByShareId: {
        data: [
          {
            _id: "46cb932a4c6346268ec4c13009cdd1b6",
            created_date: "2023-07-27T08:35:29.926Z",
            formulation_data: [
              {
                user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
                formulation_url:
                  "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/070836117__testing_with_magnifier_185604.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAS2SR42YS%2F20230727%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230727T085330Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIAcvVekGThLcCP8PG0F%2FPmzEenmiPLjGdbl6cNHqbtyRAiEAqwPIvAfGFXKF2L5uCd2gWL6zWYW49eacxhGb0qSvJZMq9gIIWhABGgw2NzM5MjgyNTgxMTMiDMLEsVh6a7Xd0NCfFyrTAsnaGrMErwI4ZD2L6WxtPDXHTmfvrlF7Iln9zLfqy2tZs%2FaZX0hbHbGXkfYSi7yByqKKCe3CdIOy7PdZXSaFe7zdHQHAq89kOhROwJC58O8m40Vfpo40G7TDQWTsXz12uLzT%2FFInRwcygC1a%2BDIoQ%2BowFgP3UNxPsx0hqvFNbG5bYSZQTRcjrpTFFz4MI19S1KRpejOlXXm1cTfD8DLdjawht%2BuCm4Jvy2eMMjxUBAeF1Q71W9vF6iTLmUO2s7VGrYGiKLQwRnqFxVCYQAG0oFRtvPD%2FwrbkOChrmSOKkVbBphVp49wqJjj1B4T78Ufn4%2FuS4bGrZk8YMNVhDv5Qnhi9WlC8pUDkBWkjNapWgfKcYcA3YQ5IOdLwIoB7qQZwq5YBuA2mdEvtYpONSYSs1zq2sTlYEW05sLf7v4ylUiu3aBhVJaqXUzAIKdzXDkDlixsN0zCF1YimBjqeAanVMkJCoWJ3CnNmWqZO5SsOPr23V%2BgDqeTtAkRBHLs6rLc%2BSbRhTMo4JWSvkRrDrbfBuTNjJzJrzL9nPKIKKSn2FgnaABO3jdEzYzkMWahaNKAJVQtDtMYI3yGit3omHxkYUIfGI5wCrv%2Bu6Sm7kKqZ0iXdLwFGV9XLC1c2im0SE0ZT%2FnUkLIYX7nRHUmzEuj65CMasOjM6o68wrSUd&X-Amz-Signature=09fa41d383fd09e5858b8862fa3a9b7468a8718641cfa43b60e108aa00a0699f&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D070836117__testing_with_magnifier_185604.jpeg&x-id=GetObject",
                formulation_type: 1,
                formulation_status: 1,
                formulation_returnurl: null,
                formulation_name: "Test-file-formulation",
                formulation_instruction: "",
                formulation_img:
                  "070836117__testing_with_magnifier_185604.jpeg",
                formulation_desc: "test file desc",
                formulation_avail_for: "[1, 2]",
                download_formulation_url:
                  "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/070836117__testing_with_magnifier_185604.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAS2SR42YS%2F20230727%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230727T085330Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIAcvVekGThLcCP8PG0F%2FPmzEenmiPLjGdbl6cNHqbtyRAiEAqwPIvAfGFXKF2L5uCd2gWL6zWYW49eacxhGb0qSvJZMq9gIIWhABGgw2NzM5MjgyNTgxMTMiDMLEsVh6a7Xd0NCfFyrTAsnaGrMErwI4ZD2L6WxtPDXHTmfvrlF7Iln9zLfqy2tZs%2FaZX0hbHbGXkfYSi7yByqKKCe3CdIOy7PdZXSaFe7zdHQHAq89kOhROwJC58O8m40Vfpo40G7TDQWTsXz12uLzT%2FFInRwcygC1a%2BDIoQ%2BowFgP3UNxPsx0hqvFNbG5bYSZQTRcjrpTFFz4MI19S1KRpejOlXXm1cTfD8DLdjawht%2BuCm4Jvy2eMMjxUBAeF1Q71W9vF6iTLmUO2s7VGrYGiKLQwRnqFxVCYQAG0oFRtvPD%2FwrbkOChrmSOKkVbBphVp49wqJjj1B4T78Ufn4%2FuS4bGrZk8YMNVhDv5Qnhi9WlC8pUDkBWkjNapWgfKcYcA3YQ5IOdLwIoB7qQZwq5YBuA2mdEvtYpONSYSs1zq2sTlYEW05sLf7v4ylUiu3aBhVJaqXUzAIKdzXDkDlixsN0zCF1YimBjqeAanVMkJCoWJ3CnNmWqZO5SsOPr23V%2BgDqeTtAkRBHLs6rLc%2BSbRhTMo4JWSvkRrDrbfBuTNjJzJrzL9nPKIKKSn2FgnaABO3jdEzYzkMWahaNKAJVQtDtMYI3yGit3omHxkYUIfGI5wCrv%2Bu6Sm7kKqZ0iXdLwFGV9XLC1c2im0SE0ZT%2FnUkLIYX7nRHUmzEuj65CMasOjM6o68wrSUd&X-Amz-Signature=fa3868bb7b48269eb864317df412e204d4bbe5771fdabcb7f7a92d8e11e7ed58&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D070836117__testing_with_magnifier_185604.jpeg&x-id=GetObject",
                template_data: "",
                __typename: "FormulationData",
              },
            ],
            template_detail: null,
            formulation_id: "860726f2-f3ca-4db6-9930-bd318b8b53e0",
            patient_id: "47aedf8a20344f68b8f064c94160046d",
            share_from: "686802e5123a482681a680a673ef7f53",
            updated_date: "2023-07-27T08:35:29.926Z",
            template_response: null,
            __typename: "Patshareformulation",
          },
        ],
        result: true,
      },
    },
  },
});

// update template
mocksData.push({
  request: {
    query: UPDATE_PAT_FORMULATION_BY_ID,
    variables: {
      ptsharresId: "46cb932a4c6346268ec4c13009cdd1b5",
      updateShareForm: {
        template_response:
          '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":721,"y":127.4375},"data":{"label":"Test 2","description":"Desc2","patientResponse":"Test Res"},"style":{"width":298,"height":248},"positionAbsolute":{"x":721,"y":127.4375},"selected":true,"dragging":false},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":109.84226659805233,"y":163.7575846343691},"data":{"label":"Test","description":"Desc","patientResponse":"test res"},"style":{"width":298,"height":248},"selected":false,"positionAbsolute":{"x":109.84226659805233,"y":163.7575846343691},"dragging":false}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}',
      },
    },
  },
  result: {
    data: {
      getFormulationByShareId: {
        _id: "46cb932a4c6346268ec4c13009cdd1b5",
        formulation_id: "e9756dde-78f8-4053-a5ca-5ab6fd5df71b",
        template_id: null,
        template_response:
          '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":721,"y":127.4375},"data":{"label":"Test 2","description":"Desc2","patientResponse":"Test Res"},"style":{"width":298,"height":248},"positionAbsolute":{"x":721,"y":127.4375},"selected":true,"dragging":false},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":109.84226659805233,"y":163.7575846343691},"data":{"label":"Test","description":"Desc","patientResponse":"test res"},"style":{"width":298,"height":248},"selected":false,"positionAbsolute":{"x":109.84226659805233,"y":163.7575846343691},"dragging":false}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}',
        __typename: "UpdatePatientFormulation",
      },
    },
  },
});

const idCustomJwtToken =
  "eyJraWQiOiJsXC9BY3BKVlJ6VGFmM1U0akhlUm8rUWZVZmlLbE9hSUphT3hjS0htNk9Rbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmMWU0MWJhYy1jYmEyLTQ3YWMtYmJkYy0xOTE2MjRhMWUzNjgiLCJjb2duaXRvOmdyb3VwcyI6WyJjdXN0b20iXSwicm9sZV9kZXRhaWwiOiJ7XCJfaWRcIjpcIjFhNWQxN2ViLWZlNWUtNDFiNi1iZmU3LWJkYjAxNzZmYzdkMlwiLFwibmFtZVwiOlwidGVzdGFjY2Vzc3Rva2VuX3JvbGVcIixcIm9yZ19pZFwiOlwiNTE3ZmEyMWE4MmMwNDY0YTkyYWFhZTkwYWUwZDVjNTlcIixcImFjY2Vzc2liaWxpdHlcIjpcInBhdGllbnRcIixcInBvc2l0aW9uXCI6XCJzaWRlYmFyXCIsXCJzdGF0dXNcIjoxLFwiY3JlYXRlZF9kYXRlXCI6XCIyMDIzLTExLTEwVDA4OjAxOjM5LjYwNlpcIixcInVwZGF0ZWRfZGF0ZVwiOlwiMjAyMy0xMS0yOFQxOToyNzo0Ni45NTRaXCJ9IiwiY3VzdG9tOmZpcnN0bmFtZSI6IkNwYXRpZW50IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfeWRGRldGRHdHIiwiYXV0aF90aW1lIjoxNzAxMTk5Njg3LCJjdXN0b206bGFzdG5hbWUiOiJDbGFzdG5hbWUiLCJleHAiOjE3MDEyMDMyODcsImlhdCI6MTcwMTE5OTY4NywianRpIjoiMzM5ZDgzOTMtYmRlMS00MWUzLTgxYTYtODM3ZmRmMjBkYjQ2IiwiZW1haWwiOiJwaXl1c2guc2luZ2grMTBAbXloZWxwLmNvLnVrIiwidGhlcmFwaXN0X2RhdGEiOiIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiZjFlNDFiYWMtY2JhMi00N2FjLWJiZGMtMTkxNjI0YTFlMzY4Iiwib3JpZ2luX2p0aSI6IjQ1ODI5Mjk1LTU1NGUtNGY2NS1iNWNlLTJmOTY0M2VhYzIyMyIsInJvbGVfYWNjZXNzIjoiW3tcIl9pZFwiOlwiMDZkMzY1MTEtMzRmNC00ZWQ4LWIxZTgtNDc1ZTI3OGMzNDkzXCIsXCJuYW1lXCI6XCJBZ3JlZW1lbnRcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn1dfSx7XCJfaWRcIjpcImY4ZTE5ZmM2LWViM2EtNGIzMC04NjcyLTZhZGEzNmIxY2NkNFwiLFwibmFtZVwiOlwiRmlsZXNcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCJmNzc2NmNmYi1lYTM4LTRjOTEtYjkzYS1hYWQ1ODk1NjY4NjlcIixcIm5hbWVcIjpcIkRvd25sb2FkXCJ9LHtcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCIwYzVmNGY3Ny04YTgyLTQ5MmYtYTdlMi1hNTc4ZmQ5YjFiMzRcIixcIm5hbWVcIjpcIlJlbGFwc2VcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn0se1wiX2lkXCI6XCI3NmI5YzQ1NC0zZDYwLTRhOWYtYjliYy1lNTc4ODE5NjVmOTRcIixcIm5hbWVcIjpcIkFkZFwifV19LHtcIl9pZFwiOlwiMWY0ODU4ZWQtZDJhYS00ZmQ5LTgxZWItZTBmNzYxOTE4YmQ0XCIsXCJuYW1lXCI6XCJTYWZldHkgUGxhblwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjc2YjljNDU0LTNkNjAtNGE5Zi1iOWJjLWU1Nzg4MTk2NWY5NFwiLFwibmFtZVwiOlwiQWRkXCJ9LHtcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCJlN2I2ZGNmNC0zZTJmLTQxN2YtOGU5ZS05OWI2NDRiMzhmNTBcIixcIm5hbWVcIjpcIk1lYXN1cmVzXCIsXCJwcml2aWxlZ2VzXCI6W3tcIl9pZFwiOlwiNzZiOWM0NTQtM2Q2MC00YTlmLWI5YmMtZTU3ODgxOTY1Zjk0XCIsXCJuYW1lXCI6XCJBZGRcIn0se1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn1dfSx7XCJfaWRcIjpcIjlkOTAxMTE2LTNiMDAtNDZmYS05ODUxLTdhZGE5M2VkMDYwY1wiLFwibmFtZVwiOlwiTW9uaXRvcnNcIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCI0MWFjMzQ3My0zODU3LTQzNjEtYmQ5OS0wZmMxZTMwZDkzNTZcIixcIm5hbWVcIjpcIkFzc2Vzc21lbnRcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn0se1wiX2lkXCI6XCJiYjQzZTBmZC0wZGFhLTQ2ODktODIwMC1hZDY3MDc5N2MyNjlcIixcIm5hbWVcIjpcIlVwZGF0ZSByZXNwb25zZVwifV19LHtcIl9pZFwiOlwiZGJmNmU4YzAtMjNkYi00NGE3LWEwZWEtNGVlNjE0NGM5MzBjXCIsXCJuYW1lXCI6XCJHb2Fsc1wiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcImM3MWM4YjQzLTY5M2YtNDIwMS04MWQxLTJjZjc2ZGUwNWQ5Y1wiLFwibmFtZVwiOlwiRm9ybXVsYXRpb25cIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn0se1wiX2lkXCI6XCJiYjQzZTBmZC0wZGFhLTQ2ODktODIwMC1hZDY3MDc5N2MyNjlcIixcIm5hbWVcIjpcIlVwZGF0ZSByZXNwb25zZVwifSx7XCJfaWRcIjpcIjc2YjljNDU0LTNkNjAtNGE5Zi1iOWJjLWU1Nzg4MTk2NWY5NFwiLFwibmFtZVwiOlwiQWRkXCJ9LHtcIl9pZFwiOlwiN2Q1MDkzYjktMzU5Zi00NTQyLThhMWYtZjgwNDAyMjgzNzcwXCIsXCJuYW1lXCI6XCJTaGFyZVwifSx7XCJfaWRcIjpcImY3NzY2Y2ZiLWVhMzgtNGM5MS1iOTNhLWFhZDU4OTU2Njg2OVwiLFwibmFtZVwiOlwiRG93bmxvYWRcIn1dfSx7XCJfaWRcIjpcIjFhNjY2OGE3LWVjMDQtNDkwNC05NzMwLWExNGFlNGFjMTU0MVwiLFwibmFtZVwiOlwiSG9tZXdvcmtcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI3NmI5YzQ1NC0zZDYwLTRhOWYtYjliYy1lNTc4ODE5NjVmOTRcIixcIm5hbWVcIjpcIkFkZFwifSx7XCJfaWRcIjpcIjViOWM1NDViLWFjMGEtNDlhNC04ZTk0LTFkMzhiODc1N2Q5NVwiLFwibmFtZVwiOlwiVmlld1wifV19LHtcIl9pZFwiOlwiYTc1MjU0Y2EtZTNmMy00MDFhLThlMjAtYmJiNTBiM2QzOWUzXCIsXCJuYW1lXCI6XCJGZWVkYmFja1wiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcIjNhOWEwNWIyLTMwYzMtNGYzYS1iYWVjLTFiZTc5NjA4NTU0NFwiLFwibmFtZVwiOlwiUmVzb3VyY2VcIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCIzMzlhMzQzZi02M2M2LTQyNmYtODM1Ny1mMmZjNWEyNWFhMjBcIixcIm5hbWVcIjpcIlByb2ZpbGVcIixcInByaXZpbGVnZXNcIjpbXX1dIiwiYXVkIjoicXBubDNuYTU0Z3NlZmR2ZG91bTFzNTF0aiIsImV2ZW50X2lkIjoiZWRjMzNkZGYtYWYzNy00ZGMxLWJhNTItOTMyNThiMWY5N2E1IiwidG9rZW5fdXNlIjoiaWQiLCJuYW1lIjoiQ3BhdGllbnQgQ2xhc3RuYW1lIiwicGhvbmVfbnVtYmVyIjoiKzQ0MTQ1MTQ1MTQiLCJwYXRpZW50X2RhdGEiOiJ7XCJfaWRcIjpcImFkNThhMGFlLTVmOWQtNGVmOS04YTAyLWUwNTRjMDI3Mzg5NVwiLFwibmFtZVwiOlwicHBhdGllbnVwZGF0ZSBwbG5cIixcImZpcnN0X25hbWVcIjpcInBwYXRpZW51cGRhdGVcIixcImxhc3RfbmFtZVwiOlwicGxuXCIsXCJvcmdfaWRcIjpcIjUxN2ZhMjFhODJjMDQ2NGE5MmFhYWU5MGFlMGQ1YzU5XCIsXCJ0aGVyYXBpc3RfaWRcIjpcIjZmZmRiYTFlLTRhZTEtNGU4MC1hYTAzLWU4NGQyMmQ2ZGZhM1wifSIsImZhbWlseV9uYW1lIjoiOTMxZWQyMGQtOTQyMy00ZWRlLTliYjktMzZmMzRiNDhjYzRiIn0.E7DhjjRNnpf83Vf2OoTN6Krwm60xBtxlFWUJ37Z3BFbfU0fuCgQ9xJc00Hpk9MJuJtXtcjhtnsX2ad1BsQvDAk5JF4OPE2mCfxV58SGSx9BUnSa1F5dLrKiqhCqsVjFsZVrZQN3mzqIrUzg6fOUOxPIlOkohyAM5jI6qbfEc0pJ6xWEaaJEyXKnT6mBsHvrREV4whV59KDySn29kUZcv5xA15QbrdKun4UXOc2BS6Pxov-ZrWKmqjp025ISZJAa9jpGBQooTHjouJZA62asuBM-u_GaJo1Tu-K_CTDTE2WBQI1hLZkn_GsbrJIYMmgckoL2B84Z6ZfcPdoUp_2GJ4g";

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <PatientEditTemplatePage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Formulation detail page", () => {
  beforeEach(() => {
    jest.spyOn(store, "getSessionToken").mockReturnValue({
      userToken: "testToken",
      userType: "patient",
      userTokenId: idCustomJwtToken,
    });

    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "patient",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        patient_data: {
          therapist_id: "a8bf94e308d04c598d0a06413cf30ef1",
        },
      },
    });
  });
  // it("formulation doc", async () => {
  //   useRouter.mockImplementation(() => ({
  //     query: {
  //       id: "46cb932a4c6346268ec4c13009cdd1b6",
  //     },
  //   }));
  //   await sut();
  //   await waitFor(() => {
  //     expect(screen.getByTestId("downloadIconButton")).toBeInTheDocument();
  //   });
  // });

  it(" submit template formulation", async () => {
    useRouter.mockImplementation(() => ({
      query: {
        id: "46cb932a4c6346268ec4c13009cdd1b5",
      },
    }));
    await sut();
    await waitFor(async () => {
      expect(screen.queryByText("Formulation Detail")).toBeInTheDocument();
      const subBtn = screen.getByTestId("tableTemplateSubmit");
      expect(subBtn).toBeInTheDocument();
      fireEvent.click(subBtn);
      expect(
        screen.getByText("Are you sure you want to submit the response?")
      ).toBeInTheDocument();
      const confirmBtn = screen.getByTestId("confirmButton");
      expect(confirmBtn).toBeInTheDocument();
      fireEvent.click(confirmBtn);
    });
    await (async () => {
      expect(
        screen.getByText("Your worksheet has been submitted successfully.")
      ).toBeInTheDocument();
    });
  });

  it(" cancel template formulation", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "46cb932a4c6346268ec4c13009cdd1b5",
      },
      back: pushMock,
    });
    await sut();
    await waitFor(async () => {
      expect(screen.queryByText("Formulation Detail")).toBeInTheDocument();
      const cancelBtn = screen.getByTestId("tableTemplateCancel");
      expect(cancelBtn).toBeInTheDocument();
      fireEvent.click(cancelBtn);
      expect(
        screen.getByText(
          "Are you sure you want to cancel the response without submitting?"
        )
      ).toBeInTheDocument();
      const confirmBtn = screen.getByTestId("confirmButton");
      expect(confirmBtn).toBeInTheDocument();
      fireEvent.click(confirmBtn);
    });
    await (async () => {
      expect(pushMock).toHaveBeenCalledWith(
        "/patient/therapy/?mainTab=therapy&tab=formulation"
      );
    });
  });
});
