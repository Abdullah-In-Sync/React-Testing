import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //   const token = localStorage.getItem('token');
  const token ="eyJraWQiOiJMbWF6a0NQdHhEMmplcUsydElFWFIwOTg5dUlsUVAxc0k1VHdZVEZsaVU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRpZW50Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImNsaWVudF9pZCI6IjRsc2JjMG9rNHNtdjZnNHZlaGtycnJnMDNsIiwib3JpZ2luX2p0aSI6IjlmNzI5YmYxLTAyYTYtNDRlYi1hN2ExLWExNjQwOTExMjhjNiIsImV2ZW50X2lkIjoiMzU5NzMyOWMtNTI3OS00YWY3LWJmNWUtMTc3MWNkOGQzMTZmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1ODU1MzMzMywiZXhwIjoxNjU4NTU2OTMzLCJpYXQiOjE2NTg1NTMzMzMsImp0aSI6ImNiNGUzOGRiLWE0NjYtNDFjZi1iNGQyLWU1Y2U5OGExN2NmZSIsInVzZXJuYW1lIjoiNWZlYzcxMWQtZTA5My00YzNlLWI2OWYtMzM2ZDNmYTEzOWJiIn0.aiJ4B46TE6suBVguYJE75cyucYuOL7WtokMN16-oWNH0QUaqfdQT9qHUPLw0gtgbWYVZ23uTm1Rr57t0z0lat3d8PETFiGUqXRsA9B82nZoCH2gPTmImKFNVsOTc6SDzLZHVDOjjpKLE5bTqk5bnrHVBK_bK4mVZZcqj3STnn473DWXwIdqM8_Y4wd2AaQfW2byvQQdVAFfizDgZH_egv8PCF9yud4F8X5N1rlTTh6TfLTfb9R45AykiV-BAKzkCN56rEJINmpprtPuh0Ks8NoT8xMYx0pHi2cQasbzIPLFEOz1iaZiWJzRCbCosNFdwc6Hv981CHyzMSBkMqkNOJw";
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
