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

const authLink = setContext((apiDetail, { headers }) => {
  const { operationName } = apiDetail;
  // get the authentication token from local storage if it exists
  const token = Cookies.get("myhelptoken");
  // return the headers to the context so httpLink can read them

  const authHeader =
    !token && publicApiNameAccessWithKey.includes(operationName)
      ? { "x-api-key": env.graphql.apiKey }
      : token
      ? { authorization: token }
      : {};
  return {
    headers: {
      ...headers,
      ...authHeader,
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
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
