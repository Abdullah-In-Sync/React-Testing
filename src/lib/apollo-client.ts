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

const httpLink = createHttpLink({
  uri: env.graphql.url,
  fetch: fetch as any,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("myhelptoken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
      ContentType: "application/json",
    },
  };
});

export const errorLink = onError(({ networkError }) => {
  // const router = useRouter();
  if (networkError && networkError["statusCode"] === 401) {
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
