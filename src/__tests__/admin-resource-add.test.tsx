import { render, screen } from "@testing-library/react";
import AddResource from "../pages/admin/resource/add";
import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import client from "../lib/apollo-client";

describe("when rendered with a `AddResource` with style", () => {
  it("should render", () => {
    render(
      <ApolloProvider client={client}>
        <SnackbarProvider>
          <AddResource />
        </SnackbarProvider>
      </ApolloProvider>
    );
    expect(screen.getByTestId("layoutUi")).toBeInTheDocument();
  });
});
