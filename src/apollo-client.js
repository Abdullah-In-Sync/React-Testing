import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //   const token = localStorage.getItem('token');
  const token ="eyJraWQiOiJMbWF6a0NQdHhEMmplcUsydElFWFIwOTg5dUlsUVAxc0k1VHdZVEZsaVU4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5ZWEyOTZiNC00YTE5LTQ5YjYtOTY5OS1jMWUyYmQ2ZmM5NDYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV95ZEZGV0ZEd0ciLCJjbGllbnRfaWQiOiI0bHNiYzBvazRzbXY2ZzR2ZWhrcnJyZzAzbCIsIm9yaWdpbl9qdGkiOiJlYTFkMTY3ZC1jMWU3LTQwNWUtOTRiMS0wZDc0Y2E1NzRmZWQiLCJldmVudF9pZCI6IjA3ZDcwYzczLWFjZjUtNGJiMy05YzNhLTNjNTc2N2Q4ZDkzMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTcyMjEyMjEsImV4cCI6MTY1NzIyNDgyMSwiaWF0IjoxNjU3MjIxMjIxLCJqdGkiOiI0NDc5Yzk2NC0wOTFiLTRjYzUtYjYwYy0zZjBkZGI2NzM4ZDAiLCJ1c2VybmFtZSI6IjllYTI5NmI0LTRhMTktNDliNi05Njk5LWMxZTJiZDZmYzk0NiJ9.oASd7Ghfuojisx0o8SCHg_D2EpivV329nTTefA1-o6nV_lrfw6n_H2Z2dggR6WTdwaFP2NWVEs1YndPkQf_F35fk4l-bKtE7l4QTcWHA1aUMpiXViRANx-Cn496qRThZPjkXfR7tn7r-H5huf0XvMM8H8XewX7QnEl9xJJ9UahVmFe1TGSYpcP25VpeYRGUk5gu9Z-fFBBH6xgOVz-BZFziqMVTnlnmyC9Wi0LimgnJ7dKYIphhcI-y55kMcssAuXLkIX_PqNUkGX6EOLex3sAl-kX53II1A7MYvGNd5YLdlxWuNRaiREbr48mlfLamX_kdRgaGAN1vGjgSe1gjzKQ";
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
