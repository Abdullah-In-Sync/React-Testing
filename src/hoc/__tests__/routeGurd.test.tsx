import React from "react";
import { render } from "@testing-library/react";
import { RouteGuard } from "../routeGaurd";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe("RouteGuard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock functions between tests
  });
  it("redirects to login page when user is not authenticated and accessing a private route", () => {
    jest.spyOn(require("js-cookie"), "get").mockReturnValueOnce(undefined);
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      asPath: "/private-route",
      push: pushMock,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    });

    render(
      <SnackbarProvider>
        <RouteGuard>
          <div>Private Content</div>
        </RouteGuard>
      </SnackbarProvider>
    );

    expect(pushMock).toHaveBeenCalledWith({
      pathname: "/account",
      query: { returnUrl: "/private-route" },
    });
  });
  it("redirects to home page when user is authenticated but accessing an unauthorized route", () => {
    jest.spyOn(require("js-cookie"), "get").mockImplementation(() => {
      return {
        myhelptoken: "validToken123",
        user_type: "admin",
      };
    });

    // Mock the router's behavior
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      asPath: "therapist/therapies/?mainTab=therapy",
      push: pushMock,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
    });

    render(
      <SnackbarProvider>
        <RouteGuard>
          <div>Unauthorized Content</div>
        </RouteGuard>
      </SnackbarProvider>
    );
    expect(pushMock).toHaveBeenCalledWith("/admin/dashboard/");
  });
});
