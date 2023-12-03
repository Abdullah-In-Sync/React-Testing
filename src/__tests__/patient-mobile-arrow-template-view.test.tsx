import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { GET_PATIENT_RESOURCE_TEMPLATE } from "../graphql/query/resource";
import PatientMobileArrowTemplatePage from "../pages/mobile/patient/[sourceId]";
import { GET_FORMULATION_BY_SHARE_ID } from "../graphql/formulation/graphql";

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
    query: GET_PATIENT_RESOURCE_TEMPLATE,
    variables: { ptsharresId: "fec3807e-bd64-4607-aa82-ec08b31a17ba" },
  },
  result: {
    data: {
      getResourceDetailById: {
        data: [
          {
            created_date: "2023-05-06T04:10:48.981Z",
            resource_data: [
              {
                // eslint-disable-next-line prettier/prettier
                template_data:
                  '{"nodes":[{"width":117,"height":47,"id":"dndnode_0","type":"selectorNode","position":{"x":427,"y":-18.462500000000006},"data":{"label":"Trigger"},"positionAbsolute":{"x":427,"y":-18.462500000000006},"selected":false,"dragging":false},{"width":117,"height":47,"id":"dndnode_2","type":"selectorNode","position":{"x":427,"y":249.36875},"data":{"label":"Behaviour"},"selected":false,"positionAbsolute":{"x":427,"y":249.36875},"dragging":false},{"width":117,"height":47,"id":"dndnode_3","type":"selectorNode","position":{"x":251.5,"y":188.36874999999998},"data":{"label":"Feeling"},"selected":false,"dragging":false,"positionAbsolute":{"x":251.5,"y":188.36874999999998}}],"edges":[{"source":"dndnode_0","sourceHandle":null,"target":"dndnode_1","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0-dndnode_1c","selected":false},{"source":"dndnode_0","sourceHandle":"b","target":"dndnode_2","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0b-dndnode_2c"},{"source":"dndnode_3","sourceHandle":null,"target":"dndnode_0","targetHandle":"a","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_3-dndnode_0a","selected":false}]}',
                resource_issmartdraw: "1",
                resource_name: "Indi arrow",
                resource_type: 2,
                template_id: "6434fe98582849e2152d631c",
                __typename: "Resource",
              },
            ],
            template_detail: {
              component_name: "ArrowTemplate",
              category: "Arrow Template",
              _id: "6434fe98582849e2152d631c",
              name: "Arrow Template",
              __typename: "Templates",
            },
            // eslint-disable-next-line prettier/prettier
            template_response:
              '{"nodes":[{"width":122,"height":66,"id":"dndnode_0","type":"selectorNode","position":{"x":427,"y":-18.462500000000006},"data":{"label":"Trigger"},"positionAbsolute":{"x":427,"y":-18.462500000000006},"selected":false,"dragging":false},{"width":122,"height":66,"id":"dndnode_2","type":"selectorNode","position":{"x":427,"y":249.36875},"data":{"label":"Behaviour","patientResponse":""},"selected":false,"positionAbsolute":{"x":427,"y":249.36875},"dragging":false},{"width":122,"height":66,"id":"dndnode_3","type":"selectorNode","position":{"x":251.5,"y":188.36874999999998},"data":{"label":"Feeling","patientResponse":""},"selected":false,"dragging":false,"positionAbsolute":{"x":251.5,"y":188.36874999999998}}],"edges":[{"source":"dndnode_0","sourceHandle":null,"target":"dndnode_1","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0-dndnode_1c","selected":false},{"source":"dndnode_0","sourceHandle":"b","target":"dndnode_2","targetHandle":"c","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_0b-dndnode_2c"},{"source":"dndnode_3","sourceHandle":null,"target":"dndnode_0","targetHandle":"a","type":"smoothstep","markerEnd":{"type":"arrow"},"id":"reactflow__edge-dndnode_3-dndnode_0a","selected":false}]}',
            __typename: "Patshareresource",
          },
        ],
      },
    },
  },
});

//formulation detail
mocksData.push({
  request: {
    query: GET_FORMULATION_BY_SHARE_ID,
    variables: {
      ptsharresId: "d79c1a02-c187-4c7f-af61-c9a215eadcac",
    },
  },
  result: {
    data: {
      getFormulationByShareId: [
        {
          _id: "d79c1a02-c187-4c7f-af61-c9a215eadcac",
          created_date: "2023-07-27T03:46:30.009Z",
          formulation_data: [
            {
              user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
              formulation_url:
                "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA2QVA4J4B%2F20230728%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230728T140649Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQCMeegQQTRrcYMUqyseAYeOZaZYpvoKpw%2F5Xtj2o7B9%2FgIhAIFdESYLPDc4UPZLDnxX6HtFz74vXc27QKnajbSFNAIqKvYCCHcQARoMNjczOTI4MjU4MTEzIgxMafua8TRvWqByKZUq0wJzIER2zJmvGrVDUdM3T1I%2BOWGaedRpkSDjOaMFL%2BI%2FMBVjT8UawZouhfFhgQp7NDtnpYsoqBjplFf27f2GKvPZByMyFphHYI%2FyuJ4Y14%2BiaaWOap81qF3uLrKhdQHPO2RDZnRIeMZO3oc6gaALytiR46gjZC%2BIZed%2B4dTtA02spuy5%2BX6fIs%2B8ozNKm19P8i60EUlfA8HOfiPRIX7Nxo%2Bm67rbIFsYFQUtN3SS4hOxnnyZBcV7VZx2w1UeUW0Acmc7uNUGUa8BCH79M8BegTsOg1J2OqZvfBxSYuw%2FuMk0gY%2BrYlgbEOT9KWckaad4Y1A1MjB5xh%2BAmBYCjREiDy0ngFmbPHLYDSQAeVeC1Z8n69l%2FtJAl1B6q9jmCMN0tEDtyF8n9KlhFou9Xy7xGxqNnHH22lVDxWI7ia%2BTuMHm%2FYepeumYYq7yV5CApLtunMXyuJNkw25aPpgY6nQGM%2BQtIdwsNgCA6aDmW8YP3cnmEzhi6jsBqC40sIZMcfVrDM378gU%2F3sla8Ia31BSHzURhUGomke3WQKb1hJ6BTeuLrQnMuK2PLb3SYnGq%2Fxuw5h%2Ft2tXes%2FbWpTbtKVjPSH3o1RUEvFP2bXNg7UmIObuKk37wAYx7c61PY7gxXIURXckT1qtCF5pyO90jcK1xVRdGQcHPa8ZOYl2Xt&X-Amz-Signature=cb8ece11beb6ad0dd4febda9f3389163ba550d912e8e949839633d5aa8e532ee&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D&x-id=GetObject",
              formulation_type: 1,
              formulation_status: 1,
              formulation_returnurl: null,
              formulation_name: "Test-Arrow-temp",
              formulation_instruction: "",
              formulation_img: "",
              formulation_desc: "Test description",
              formulation_avail_for: "[1, 2]",
              download_formulation_url:
                "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/formulation/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA2QVA4J4B%2F20230728%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230728T140649Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQCMeegQQTRrcYMUqyseAYeOZaZYpvoKpw%2F5Xtj2o7B9%2FgIhAIFdESYLPDc4UPZLDnxX6HtFz74vXc27QKnajbSFNAIqKvYCCHcQARoMNjczOTI4MjU4MTEzIgxMafua8TRvWqByKZUq0wJzIER2zJmvGrVDUdM3T1I%2BOWGaedRpkSDjOaMFL%2BI%2FMBVjT8UawZouhfFhgQp7NDtnpYsoqBjplFf27f2GKvPZByMyFphHYI%2FyuJ4Y14%2BiaaWOap81qF3uLrKhdQHPO2RDZnRIeMZO3oc6gaALytiR46gjZC%2BIZed%2B4dTtA02spuy5%2BX6fIs%2B8ozNKm19P8i60EUlfA8HOfiPRIX7Nxo%2Bm67rbIFsYFQUtN3SS4hOxnnyZBcV7VZx2w1UeUW0Acmc7uNUGUa8BCH79M8BegTsOg1J2OqZvfBxSYuw%2FuMk0gY%2BrYlgbEOT9KWckaad4Y1A1MjB5xh%2BAmBYCjREiDy0ngFmbPHLYDSQAeVeC1Z8n69l%2FtJAl1B6q9jmCMN0tEDtyF8n9KlhFou9Xy7xGxqNnHH22lVDxWI7ia%2BTuMHm%2FYepeumYYq7yV5CApLtunMXyuJNkw25aPpgY6nQGM%2BQtIdwsNgCA6aDmW8YP3cnmEzhi6jsBqC40sIZMcfVrDM378gU%2F3sla8Ia31BSHzURhUGomke3WQKb1hJ6BTeuLrQnMuK2PLb3SYnGq%2Fxuw5h%2Ft2tXes%2FbWpTbtKVjPSH3o1RUEvFP2bXNg7UmIObuKk37wAYx7c61PY7gxXIURXckT1qtCF5pyO90jcK1xVRdGQcHPa8ZOYl2Xt&X-Amz-Signature=e11ba90f96d7267a6d5d4cd8576992631f1e1de23c8dc2891a26f2e44c4564a4&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D&x-id=GetObject",
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
          updated_date: "2023-07-28T13:40:10.618Z",
          template_response:
            '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":721,"y":127.4375},"data":{"label":"Test 2","description":"Desc2","patientResponse":"Test Res mobile"},"style":{"width":298,"height":248},"positionAbsolute":{"x":721,"y":127.4375},"selected":true,"dragging":false},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":109.84226659805233,"y":163.7575846343691},"data":{"label":"Test","description":"Desc","patientResponse":"test res"},"style":{"width":298,"height":248},"selected":false,"positionAbsolute":{"x":109.84226659805233,"y":163.7575846343691},"dragging":false}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}',
          __typename: "Patshareformulation",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <PatientMobileArrowTemplatePage />
      </SnackbarProvider>
    </MockedProvider>
  );
};

describe("Patient mobile view Arrow template page", () => {
  it("should render patient resource mobile view Arrow template", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        sourceId: "fec3807e-bd64-4607-aa82-ec08b31a17ba",
      },
      ...mockRouter,
    }));
    await sut();
    const tokenInput = screen.getByTestId("tokenInput");
    expect(tokenInput).toBeInTheDocument();
    fireEvent.change(tokenInput, {
      target: { value: "sasfdgh" },
    });
    fireEvent.click(tokenInput);
    const arrowTemplate = await screen.findAllByTestId("arrow-template-test-1");
    expect(arrowTemplate.length).toEqual(3);
    fireEvent.click(arrowTemplate[0]);
    const popup = screen.getByTestId("responsePopup");
    expect(popup).toBeInTheDocument();
    const responseInput = screen.getByTestId("responsePopupInput");
    expect(responseInput).toBeInTheDocument();
    fireEvent.change(responseInput, {
      target: { value: "testPopup" },
    });
    const submitBtn = await screen.getByTestId("responsePopupSubmitBtn");
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/testPopup/i)).toBeInTheDocument();
    const saveBtn = await screen.findByTestId("ArrowMobileTemplateSave");
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    const confirmBtn = await screen.getByTestId("confirmButton");
    expect(confirmBtn).toBeInTheDocument();
    const cancelBtn = await screen.getByTestId("cancelButton");
    expect(cancelBtn).toBeInTheDocument();
  });
  it("should render patient formulation mobile view Arrow template", async () => {
    (useRouter as jest.Mock).mockClear();
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        sourceId: "d79c1a02-c187-4c7f-af61-c9a215eadcac",
        isFormulation: "true",
      },
      ...mockRouter,
    }));
    await sut();
    const tokenInput = screen.getByTestId("tokenInput");
    expect(tokenInput).toBeInTheDocument();
    fireEvent.change(tokenInput, {
      target: { value: "sasfdgh" },
    });
    fireEvent.click(tokenInput);
    const arrowTemplate = await screen.findAllByTestId("arrow-template-test-1");
    expect(arrowTemplate.length).toEqual(2);
    fireEvent.click(arrowTemplate[0]);
    const popup = screen.getByTestId("responsePopup");
    expect(popup).toBeInTheDocument();
    const responseInput = screen.getByTestId("responsePopupInput");
    expect(responseInput).toBeInTheDocument();
    fireEvent.change(responseInput, {
      target: { value: "testPopup" },
    });
    const submitBtn = await screen.getByTestId("responsePopupSubmitBtn");
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/testPopup/i)).toBeInTheDocument();
    const saveBtn = await screen.findByTestId("ArrowMobileTemplateSave");
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    const confirmBtn = await screen.getByTestId("confirmButton");
    expect(confirmBtn).toBeInTheDocument();
    const cancelBtn = await screen.getByTestId("cancelButton");
    expect(cancelBtn).toBeInTheDocument();
  });
});
