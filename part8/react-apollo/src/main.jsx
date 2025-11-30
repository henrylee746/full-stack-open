import ReactDOM from "react-dom/client";
import App from "./App";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("phonenumbers-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
