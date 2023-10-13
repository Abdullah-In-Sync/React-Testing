import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import Router from "next/router";
import fetch from "node-fetch";
import { clearSession } from "../utility/storage";
import { env } from "./env";
import { publicApiNameAccessWithKey, publicPaths } from "./constants";
import { getIntialPath } from "../utility/helper";

const httpLink = createHttpLink({
  uri: env.graphql.url,
  fetch: fetch as any,
});
/* istanbul ignore next */
const authLink = setContext((apiDetail, { headers }) => {
  const { operationName } = apiDetail;
  // get the authentication token from local storage if it exists
  const token = Cookies.get("myhelptoken");
  // return the headers to the context so httpLink can read them

  const getAuthHeader = () => {
    if (!token && publicApiNameAccessWithKey.includes(operationName))
      return { "x-api-key": env.graphql.apiKey };
    else if (token) return { authorization: token };
    else return {};
  };
  return {
    headers: {
      ...headers,
      ...getAuthHeader(),
      ContentType: "application/json",
    },
  };
});

export const errorLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError["statusCode"] === 401 &&
    !publicPaths.includes(getIntialPath(Router.asPath))
  ) {
    clearSession(() => {
      Router.replace("/account");
    });
  }
  /* istanbul ignore next */
  if (networkError && networkError["statusCode"] === 403) {
    /* istanbul ignore next */
    (document as any)?.enqueueSnackbar?.(
      "Your input is invalid, please try again.",
      {
        variant: "error",
      }
    );
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
