import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import theme from "../../../../styles/theme/theme";

import { useRouter } from "next/router";
import {
  DELETE_THERAPIST_BY_ID,
  GET_ADMIN_THERAPIST_LIST,
  UPDATE_THERAPIST_BY_ID,
} from "../../../../graphql/Therapist/graphql";
import TherapistListPage from "../../../../pages/admin/therapist/list";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ADMIN_THERAPIST_LIST,
    variables: {
      searchText: "",
      pageNo: 1,
      limit: 10,
    },
  },
  result: {
    data: {
      getTherapistList: {
        total: "65",
        therapistlist: [
          {
            _id: "tharapist_id_1",
            therapist_name: "Dodctor",
            therapist_status: 1,
            plan: "free",
            user_id: "user_id_1",
            org_data: [
              {
                name: "portal.dev-myhelp",
                _id: "org_id_1",
              },
            ],
          },
          {
            _id: "tharapist_id_2",
            therapist_name: "tom hanks",
            therapist_status: 0,
            plan: "free",
            user_id: "user_id_2",
            org_data: [
              {
                name: "portal.dev-myhelp",
                _id: "org_id_2",
              },
            ],
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_THERAPIST_LIST,
    variables: {
      limit: 10,
      searchText: "stext",
      pageNo: 1,
    },
  },
  result: {
    data: {
      getTherapistList: {
        total: "65",
        therapistlist: [
          {
            _id: "tharapist_id_1",
            therapist_name: "testname",
            therapist_status: 1,
            plan: "free",
            user_id: "user_id_1",
            org_data: [
              {
                name: "portal.dev-myhelp",
                _id: "org_id_1",
              },
            ],
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_THERAPIST_BY_ID,
    variables: {
      therapist_id: "tharapist_id_1",
    },
  },
  result: {
    data: {
      deleteTherapist: {
        message: null,
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_BY_ID,
    variables: {
      user_id: "user_id_1",
      update: {
        therapist_status: 0,
      },
    },
  },
  result: {
    data: {
      updateTherapistById: {
        _id: "id1",
        user_id: "user_id_1",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_BY_ID,
    variables: {
      user_id: "user_id_2",
      update: {
        therapist_status: 1,
      },
    },
  },
  result: {
    data: {
      updateTherapistById: {
        _id: "id2",
        user_id: "user_id_2",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin therapist list", () => {
  it("should render list", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    await sut();
    expect(await screen.findByText(/Dodctor/i)).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("createPlanButton"));
    expect(pushMock).toHaveBeenCalledWith("/admin/therapist/add");
  });

  it("should render search data", async () => {
    await sut();
    const searchInput = await screen.findByTestId("searchInput");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: "stext" },
    });
    expect(await screen.findByText("testname")).toBeInTheDocument();
  });

  it("delete therapist from list", async () => {
    await sut();
    const deleteButton = await screen.findByTestId(
      "iconButton_delete_tharapist_id_1"
    );
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    const approveDeleteBtn = screen.getByTestId("confirmButton");
    expect(approveDeleteBtn).toBeInTheDocument();
    fireEvent.click(approveDeleteBtn);

    expect(
      await screen.findByText(/Therapist deleted successfully!/i)
    ).toBeInTheDocument();
  });

  it("block therapist from list", async () => {
    await sut();
    const blockButton0 = await screen.findByTestId(
      "iconButton_block_tharapist_id_1"
    );
    fireEvent.click(blockButton0);
    expect(
      await screen.findByText(/Therapist Blocked successfully!/i)
    ).toBeInTheDocument();

    const blockButton1 = await screen.findByTestId(
      "iconButton_block_tharapist_id_2"
    );
    fireEvent.click(blockButton1);
    expect(
      await screen.findByText(/Therapist Unblocked successfully!/i)
    ).toBeInTheDocument();
  });
});
