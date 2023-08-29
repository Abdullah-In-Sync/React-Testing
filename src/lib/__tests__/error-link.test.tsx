import {
  ApolloLink,
  execute,
  FetchResult,
  from,
  gql,
  Observable,
  Operation,
} from "@apollo/client";
import Router from "next/router";
import { errorLink } from "../apollo-client";
import * as helper from "../../utility/helper";

jest.mock("next/router", () => ({ replace: jest.fn() }));

interface LinkResult<T> {
  operation: Operation;
  result: FetchResult<T>;
}

const MockQuery = gql`
  query {
    test
  }
`;

const GetOrgQuery = gql`
  query GetOrgByDomain {
    test
  }
`;

class NetworkError extends Error {
  bodyText;
  statusCode;
  result;
  message;
  response;

  constructor(networkErrorProps, ...params) {
    super(...params);
    const { name, bodyText, statusCode, result, message, response } =
      networkErrorProps;

    this.name = name;
    this.bodyText = bodyText;
    this.statusCode = statusCode;
    this.result = result;
    this.message = message;
    this.response = response;
  }
}

describe("errorLink", () => {
  jest.mock("../../utility/storage", () => ({
    clearSession: (callback) => {
      callback();
    },
  }));

  const orgNameSpy = jest.spyOn(helper, "getIntialPath");
  orgNameSpy.mockReturnValue("portal");

  it("should handle error and redirect to login screen", async () => {
    const mockLink = new ApolloLink(() => {
      const fetchResult: FetchResult = {
        errors: [],
        data: null,
      };

      const linkResult = Observable.of(fetchResult).map(() => {
        throw new NetworkError({
          name: "ServerParseError",
          message: "Unexpected token",
          response: {},
          bodyText:
            "<!DOCTYPE html><html><head></head><body>Error</body></html>",
          statusCode: 401,
          result: {},
        });
      });
      return linkResult;
    });

    async function executeLink<T = any>(dataLink: ApolloLink) {
      const linkResult = {} as LinkResult<T>;

      return new Promise<LinkResult<T>>((resolve) => {
        execute(from([errorLink, dataLink]), {
          query: MockQuery,
        }).subscribe(
          () => {
            //
          },
          () => {
            resolve(linkResult);
          }
        );
      });
    }

    await executeLink(mockLink);

    expect(Router.replace).toHaveBeenCalledWith("/account");
  });

  it("should handle success", async () => {
    const mockLink = new ApolloLink(() => {
      const fetchResult: FetchResult = {
        errors: [],
        data: null,
      };

      const linkResult = Observable.of(fetchResult).map(() => {
        throw new NetworkError({
          name: "ServerParseError",
          message: "Unexpected token",
          response: {},
          bodyText:
            "<!DOCTYPE html><html><head></head><body>Error</body></html>",
          statusCode: 401,
          result: {},
        });
      });
      return linkResult;
    });

    async function executeLink<T = any>(dataLink: ApolloLink) {
      const linkResult = {} as LinkResult<T>;

      return new Promise<LinkResult<T>>((resolve) => {
        execute(from([errorLink, dataLink]), {
          query: GetOrgQuery,
        }).subscribe(
          () => {
            //
          },
          () => {
            resolve(linkResult);
          }
        );
      });
    }

    await executeLink(mockLink);

    expect(Router.replace).toHaveBeenCalledWith("/account");
  });
});
