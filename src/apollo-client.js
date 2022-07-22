import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //   const token = localStorage.getItem('token');
  const token ="eyJraWQiOiJMbWF6a0NQdHhEMmplcUsydElFWFIwOTg5dUlsUVAxc0k1VHdZVEZsaVU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRpZW50Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImNsaWVudF9pZCI6IjRsc2JjMG9rNHNtdjZnNHZlaGtycnJnMDNsIiwib3JpZ2luX2p0aSI6IjViMTJlMzExLWViMWMtNGJiOS04ZTY2LThlNmNhMTBjODVmMyIsImV2ZW50X2lkIjoiMjc0NWFmOTItZmI5Ny00MzE5LWI0MWEtMWY1OTE3NjRjNGIyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1ODUwMTA0MywiZXhwIjoxNjU4NTA0NjQzLCJpYXQiOjE2NTg1MDEwNDMsImp0aSI6IjVmMDdlMDkwLTAxYjctNGYzZS05NmM1LTZjMDkxMWRlZjhiMyIsInVzZXJuYW1lIjoiNWZlYzcxMWQtZTA5My00YzNlLWI2OWYtMzM2ZDNmYTEzOWJiIn0.gKVpMTMV9VlErj-fejUGuIRoGK3NR29u1XsOdOM_ZzMG3CGqTvU3IfR-OUrBmlvtW0mCsyL85cGA0rHQipgehA4acN1gE7lKhfsCAyc3wdmh4vUssY0GS4FFNVQ4h81Ryo2zZk-4_aBGnlKJPGTbCKlyGzeMiubaZtZ7ZWSC1qSXx-0OwKNCeD6E7YovedtLtg3Ws7Yoz7CHhgsv7tC4WB-ORHhPwP4fw1BqyJQ8S8mkETkEQxxA-sCo0Ke5gfSoJwmBfpKWW8R6YNtr7iKrq7SkSH-0bZuvlLUHHgO_k8Vf7Uxw_KebwYztKGGDRxj79xgeOiUaBbI7TnxvmNRJlg";
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
