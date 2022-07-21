import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //   const token = localStorage.getItem('token');
  const token ="eyJraWQiOiJMbWF6a0NQdHhEMmplcUsydElFWFIwOTg5dUlsUVAxc0k1VHdZVEZsaVU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRpZW50Il0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImNsaWVudF9pZCI6IjRsc2JjMG9rNHNtdjZnNHZlaGtycnJnMDNsIiwib3JpZ2luX2p0aSI6IjJlOTljMzMyLTdiNGYtNDFhNi1iZDI5LTQyMDBmZmE2MTc2ZSIsImV2ZW50X2lkIjoiOTRkNTNkNTktNDk2ZS00NjJmLTg1ZGYtZjAzZjJhYmQzODNiIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1ODMzODU5NywiZXhwIjoxNjU4MzQyMTk2LCJpYXQiOjE2NTgzMzg1OTcsImp0aSI6IjNiMjM1YmY1LTVmMmUtNGU4NC1hYjdjLTc4YzJmZTM1YTYyYSIsInVzZXJuYW1lIjoiNWZlYzcxMWQtZTA5My00YzNlLWI2OWYtMzM2ZDNmYTEzOWJiIn0.XQYSUTbyWGLITehf3i96MFoR9j3U5xdiQC5PixUeLaqDZggrlm_Mjev5o_fDfha5Qq7dtYs56ugzDassFxCK9DgLyq7Z3eMvQT7ibvhwuFiHwWEMf3T8GK9UIjBSdIcJKxchgyfMkzLN8ubBfD0Of_u6yJ8fmeK6bEDe6P8o3T19eLlC51rjsdud5-ZhHFVSaMCSD__6JtBC6ATwkWsLnPI7GbNHJOgMOq32Fmo1xxZoEnBxYpEi8srKz1BZMTwC1VqhU9RYDq8uk4kh5YIQEvIHGIa60ElJl6EQg19AOKeTizKJcUToPhjEI9LbBeU_lH7hIYXZe6qDxK2yTV2-cQ";
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
