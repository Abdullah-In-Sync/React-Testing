import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import MeasuresFormAdd from "../MeasuresFormAdd";
import theme from "../../../../styles/theme/theme";
import { Formik } from "formik";

test("renders MeasuresFormAdd component", () => {
  const therapistSafetyPlanList = {
    therapistGetAdminMeasures: [{ _id: "1", title: "Measure 1" }],
  };
  const onChangePlanIdMock = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={theme()}>
      <Formik
        initialValues={{ planDesc: "", planName: "", title: "" }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onReset={() => {}}
      >
        {() => (
          <MeasuresFormAdd
            therapistSafetyPlanList={therapistSafetyPlanList}
            onChangePlanId={onChangePlanIdMock}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onPressSubmit={() => {}}
          />
        )}
      </Formik>
    </ThemeProvider>
  );
  const selectElement = getByTestId("title") as HTMLSelectElement;
  fireEvent.change(selectElement, { target: { value: "1" } });
  expect(selectElement.value).toBe("1");
  expect(onChangePlanIdMock).toHaveBeenCalledWith("1");
});

test("renders MeasuresFormAdd component without therapistGetAdminMeasures", () => {
  const therapistSafetyPlanList = {
    therapistGetAdminMeasures: undefined,
  };
  const onChangePlanIdMock = jest.fn();
  const { getByTestId } = render(
    <ThemeProvider theme={theme()}>
      <Formik
        initialValues={{ planDesc: "", planName: "", title: "" }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onReset={() => {}}
      >
        {() => (
          <MeasuresFormAdd
            therapistSafetyPlanList={therapistSafetyPlanList}
            onChangePlanId={onChangePlanIdMock}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onPressSubmit={() => {}}
          />
        )}
      </Formik>
    </ThemeProvider>
  );
  const selectElement = getByTestId("title");
  expect(selectElement.children.length).toBe(0);
});
