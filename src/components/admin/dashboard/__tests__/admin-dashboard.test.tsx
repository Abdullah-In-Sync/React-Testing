import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import AdminDashboard from "../../../../pages/admin/dashboard";

const sut = async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <AdminDashboard />
    </MockedProvider>
  );
};

describe("Admin dashboard", () => {
  it("should render dashboard screen", async () => {
    await sut();
    expect(screen.getByText(/Welcome to MyHelp Admin/i)).toBeInTheDocument();
  });
});
