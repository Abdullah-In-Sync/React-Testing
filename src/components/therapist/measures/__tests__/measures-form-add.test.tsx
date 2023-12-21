import { ThemeProvider } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import { Formik } from "formik";
import theme from "../../../../styles/theme/theme";
import AddMeasuresPlanForm from "../AddMeasuresPlan";

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
        <AddMeasuresPlanForm
          onPressSubmit={onPressSubmit}
          therapistSafetyPlanList={mockData}
          receivePlanId={onChangePlanId}
        />
      </Formik>
    </ThemeProvider>
  );
};

describe("MeasuresFormAdd component", () => {
  it("renders without crashing", () => {
    const onPressSubmit = jest.fn();
    const therapistSafetyPlanList = {
      therapistGetAdminMeasures: { data: null },
    };
    const onChangePlanId = jest.fn();

    sut(therapistSafetyPlanList, onChangePlanId, onPressSubmit);
  });

  it("calls onChangePlanId with the correct value when input changes", () => {
    const onPressSubmit = jest.fn();
    const therapistSafetyPlanList = {
      therapistGetAdminMeasures: {
        data: [
          { _id: "1", title: "Measure 1" },
          { _id: "2", title: "Measure 2" },
        ],
      },
    };
    const onChangePlanId = jest.fn();
    const { getByTestId } = sut(
      therapistSafetyPlanList,
      onChangePlanId,
      onPressSubmit
    );
    const input = getByTestId("title");
    fireEvent.change(input, { target: { value: "2" } });

    expect(onChangePlanId).toHaveBeenCalledWith("2");
  });

  it("calls onPressSubmit when the 'Add' button is clicked", () => {
    const onPressSubmit = jest.fn();
    const therapistSafetyPlanList = {
      therapistGetAdminMeasures: { data: [{ _id: "1", title: "Measure 1" }] },
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
