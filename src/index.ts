import { ApolloServer } from "apollo-server";
import { createContext } from "./context";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
