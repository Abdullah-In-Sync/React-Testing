import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //   const token = localStorage.getItem('token');
  const token ="eyJraWQiOiJMbWF6a0NQdHhEMmplcUsydElFWFIwOTg5dUlsUVAxc0k1VHdZVEZsaVU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRpZW50Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImNsaWVudF9pZCI6IjRsc2JjMG9rNHNtdjZnNHZlaGtycnJnMDNsIiwib3JpZ2luX2p0aSI6ImNiNjk5ZjU0LTQzZmEtNGY4MS1hZmY2LTczZTk3YmNiYmNlYSIsImV2ZW50X2lkIjoiN2E1MjRkMWYtZTNjMi00ZTNmLWEzNDktYjViNWU1MGFmM2ZiIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1ODU0OTM1MSwiZXhwIjoxNjU4NTUyOTUxLCJpYXQiOjE2NTg1NDkzNTEsImp0aSI6ImEzOTgzOTRiLTM3MjgtNDU1Mi05ODAxLTZlYzllY2UyY2M0NCIsInVzZXJuYW1lIjoiNWZlYzcxMWQtZTA5My00YzNlLWI2OWYtMzM2ZDNmYTEzOWJiIn0.XVdl9c8Q-CXXUIpvuJfHVgbIBPkYoUFNizG0q35ffQvTr8kjkD4LNvKZLdy3jKFFF3CxHzEILW7wy90JTHoUX3urkVaYz1bT_h21Ut_wpKko82j_L6qKP4PYmjZ7r578FrYwmoXx84BcVg5CfOWF3J5f5j6r3xZB7MQMaJrDFSfOzkYqBpnbHQFq9zZ-0QCh3Unf7U8GMS4Ht7HFwE6qcY2smuQJbBhSq515_jCoAEASiFIdJK5s1SQndqtilCAIOg0z3viQv6YXNKX41BfWKbm6LmMr_SVsqwA9P79SEy3N-wxIasA24DixLegm1-pNoULIIPaEoYv_d1nsu_wEXg";
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
