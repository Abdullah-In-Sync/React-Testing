import { ThemeProvider } from "@mui/material";
import theme from "../../../../styles/theme/theme";
import { Formik } from "formik";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MeasuresFormAdd from "../MeasuresFormAdd";

const sut = (mockData, onChangePlanId, onPressSubmit) => {
  return render(
    <ThemeProvider theme={theme()}>
      <Formik
        initialValues={{ planDesc: "", planName: "", title: "" }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onReset={() => {}}
      >
        <MeasuresFormAdd
          onPressSubmit={onPressSubmit}
          therapistSafetyPlanList={mockData}
          onChangePlanId={onChangePlanId}
        />
      </Formik>
    </ThemeProvider>
  );
};

describe("MeasuresFormAdd component", () => {
  it("renders without crashing", () => {
    const onPressSubmit = jest.fn();
    const therapistSafetyPlanList = {
      therapistGetAdminMeasures: null,
    };
    const onChangePlanId = jest.fn();

    sut(therapistSafetyPlanList, onChangePlanId, onPressSubmit);
  });

  it("calls onChangePlanId with the correct value when input changes", () => {
    const onPressSubmit = jest.fn();
    const therapistSafetyPlanList = {
      therapistGetAdminMeasures: [{ _id: "1", title: "Measure 1" }],
    };
    const onChangePlanId = jest.fn();
    const { getByTestId } = sut(
      therapistSafetyPlanList,
      onChangePlanId,
      onPressSubmit
    );
    const input = getByTestId("title");
    fireEvent.change(input, { target: { value: "1" } });

    expect(onChangePlanId).toHaveBeenCalledWith("1");
  });

  it("calls onPressSubmit when the 'Add' button is clicked", () => {
    const onPressSubmit = jest.fn();
    const therapistSafetyPlanList = {
      therapistGetAdminMeasures: [{ _id: "1", title: "Measure 1" }],
    };
    const onChangePlanId = jest.fn();

    const { getByTestId } = sut(
      therapistSafetyPlanList,
      onChangePlanId,
      onPressSubmit
    );
    const input = getByTestId("title");
    fireEvent.change(input, { target: { value: "1" } });

    const addButton = getByTestId("addSubmitForm");
    fireEvent.click(addButton);
    expect(onChangePlanId).toHaveBeenCalledWith("1");
    expect(onPressSubmit).toHaveBeenCalled();
  });
});
