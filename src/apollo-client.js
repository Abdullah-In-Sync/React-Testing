import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get("myhelptoken");
  //const token = "eyJraWQiOiJMbWF6a0NQdHhEMmplcUsydElFWFIwOTg5dUlsUVAxc0k1VHdZVEZsaVU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRpZW50Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImNsaWVudF9pZCI6IjRsc2JjMG9rNHNtdjZnNHZlaGtycnJnMDNsIiwib3JpZ2luX2p0aSI6IjE5NjY2MWRmLWJjYjYtNDFlMS04ZmUxLWJiZjIyMGYyMTk5NCIsImV2ZW50X2lkIjoiYmJjY2Y4NzItOTA2MC00YmUyLWIwNjYtNTlkYzg5YzUyM2FlIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1ODU1NzI5NCwiZXhwIjoxNjU4NTYwODk0LCJpYXQiOjE2NTg1NTcyOTQsImp0aSI6ImU5MzgwNmU4LWYyYTItNDhmMS04YjEyLWM2ZGJiODdmNzU2NCIsInVzZXJuYW1lIjoiNWZlYzcxMWQtZTA5My00YzNlLWI2OWYtMzM2ZDNmYTEzOWJiIn0.D1rMn4_lyhvxKl724pL4Qgq1yPfQb-9mf4l4XRzvc-l_wVNtdKteld0xUcsVqBT9mBMjpHqkjx8QwPuwX_FOqRKZniiDDUE6nWJiwXf8-dq9Fn0e5rwagDcof02miVQnX-ids1JJCEJ0bF0HcEZAUGQBKoI_meVaJOXb1wbbwdvj5lLMQkLpYgnFt2bdakrOUtNiNGggqyDHa6AOVdS7D4Th0Tpl52LGMMaAdBa9iZLbsK4vkXiFiahQkNusPW5BAi7olWG26bxBNm4gEEU6tgUspwKfcfzSKfCXaimz5j9tyf6ze8ThVsxRgDQgqKzU3nwLVi29ULimKTO214bvfA";
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
