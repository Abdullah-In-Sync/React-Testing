import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import {
  ADMIN_ADD_CATEGORY,
  ADMIN_UPDATE_ASSESSMENT_CATEGORY,
  ADMIN_VIEW_ASSESSMENT,
} from "../../../../graphql/assessment/graphql";
import AssessmentListPage from "../../../../pages/admin/assessment/view/[id]";
import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

const mocksData = [];

mocksData.push({
  request: {
    query: ADMIN_VIEW_ASSESSMENT,
    variables: {
      assessmentId: "assessment-id-1",
    },
  },
  result: {
    data: {
      adminViewAssessment: {
        _id: "e4f31884-d419-4aa0-adcb-2b81dfbd8f8c",
        category: [
          {
            _id: "cat1",
            assessment_id: "e4f31884-d419-4aa0-adcb-2b81dfbd8f8c",
            name: "test",
            status: 1,
          },
        ],
        name: "test-case-assessment",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_ADD_CATEGORY,
    variables: {
      assessmentId: "assessment-id-1",
      name: "test",
    },
  },
  result: {
    data: {
      adminCreateAssessmentCategory: {
        _id: "e4f31884-d419-4aa0-adcb-2b81dfbd8f8c",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_ASSESSMENT_CATEGORY,
    variables: {
      categoryId: "cat1",
      updateCat: {
        name: "test",
        status: 1,
      },
    },
  },
  result: {
    data: {
      adminUpdateAssessmentCategory: {
        _id: "cat1",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AssessmentListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "assessment-id-1",
    },
    push: pushMock,
  });
});

describe("Admin assessment category list", () => {
  it("should render admin assessment category list and add new assessment category", async () => {
    await sut();
    const firstRecordName = await screen.findByText(/test/i);
    expect(firstRecordName).toBeInTheDocument();
    const addCategoryButton = await screen.findByTestId("addCategory");
    fireEvent.click(addCategoryButton);
    const nameInput = await screen.findByTestId("categoryName");
    fireEvent.change(nameInput, {
      target: { value: "test" },
    });

    const submitButton = await screen.findByTestId("addAssessmentSubmit");
    fireEvent.click(submitButton);
    const cancelButton = await screen.findByTestId("cancelButton");
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
    fireEvent.click(submitButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Assessment category added successfully./i)
    ).toBeInTheDocument();
  });

  it("should update assessment category", async () => {
    await sut();
    const firstRecordName = await screen.findByText(/test/i);
    expect(firstRecordName).toBeInTheDocument();
    const editButton1 = await screen.findByTestId("iconButton_cat1_0");
    fireEvent.click(editButton1);
    const nameInput = await screen.findByTestId("categoryName");
    fireEvent.change(nameInput, {
      target: { value: "test" },
    });

    const submitButton = await screen.findByTestId("addAssessmentSubmit");
    fireEvent.click(submitButton);
    const cancelButton = await screen.findByTestId("cancelButton");
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
    fireEvent.click(submitButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Assessment category updated successfully./i)
    ).toBeInTheDocument();
  });
});
