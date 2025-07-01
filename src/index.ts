import { ApolloServer } from "apollo-server";

import { createContext } from "./context";
import { schema } from "./schema"; // ✅ Use named import

const server = new ApolloServer({
  schema, // ✅ Use the full executable schema
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
