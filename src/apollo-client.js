import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("myhelptoken");
  //const token = "eyJraWQiOiJMbWF6a0NQdHhEMmplcUsydElFWFIwOTg5dUlsUVAxc0k1VHdZVEZsaVU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyYWEyMjhhOS1lYzgyLTQ1MzgtYjVhOS0yYzlhOTdiOWQ2NTIiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRpZW50Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImNsaWVudF9pZCI6IjRsc2JjMG9rNHNtdjZnNHZlaGtycnJnMDNsIiwib3JpZ2luX2p0aSI6IjhhMjhmMGUwLTVkMWYtNGU1Yy1hNDkxLTVkMmRiZmM4NjQ1OCIsImV2ZW50X2lkIjoiZWEwNTUxZTYtOGRiMi00NzAwLWJmMTctNTdjYTcxN2VmYjMxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1OTYyOTQyOCwiZXhwIjoxNjU5NjMzMDI4LCJpYXQiOjE2NTk2Mjk0MjgsImp0aSI6IjJkZWQ4NmRkLWQ5ZDMtNGVmYS04ZmQ5LTJmYjA1NTEwN2UxZCIsInVzZXJuYW1lIjoiMmFhMjI4YTktZWM4Mi00NTM4LWI1YTktMmM5YTk3YjlkNjUyIn0.B6R2H2JCSVBbY0Yo729BdvEC55EQffEt6KC0T_mO460_16IehjR5CeuDbo5fRDQnP11mTE9VOjouJDHhisP4oRl2HFZPDW8t294aU8_YkO_axKrjrWwS1D0fTyzvrKXnq9mai2jtwDIssacHSoUMNwkzfodJPJ3Y4FVYHK2Gn3sAaK0yzxAljVkP9yeXmNTq7DI6DLe6e9lFy6is98i6izgeUHzVIkyp-yTX1S96SKzLD8cT8lvKnIujjyNEtH24qNmWHG9_p9cThIuvbsVnlJIoTioSt-3BQeMUjZZVmom7LOqIsvYxIqqfLd1nsODUijvCBNrHSOSY8izi8QxNow";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
      ContentType: "application/json",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
