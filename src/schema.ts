import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "apollo-server";
import fs from "fs";
import path from "path";

// --------------------- SDL Loaders --------------------- //

const loadSDL = (relativePath: string) =>
  gql(fs.readFileSync(path.join(__dirname, relativePath), "utf8"));

const commonTypeDefs = loadSDL("./common/gql/common.gql");
const userTypeDefs = loadSDL("./user/gql/user.gql");
const teamTypeDefs = loadSDL("./team/gql/team.gql");
const orderTypeDefs = loadSDL("./order/gql/order.gql");
const ratingTypeDefs = loadSDL("./rating/gql/rating.gql");
const preferencesTypeDefs = loadSDL("./preferences/gql/preferences.gql");
//const boostTypeDefs = loadSDL("./boost/gql/boost.gql");

// --------------------- Resolver Imports --------------------- //

import { resolver as commonresolver } from "./common/gql/resolver";
import { resolver as orderresolver } from "./order/gql/resolver";
import { resolver as preferencesresolver } from "./preferences/gql/resolver";
import { resolver as ratingresolver } from "./rating/gql/resolver";
import { resolver as teamresolver } from "./team/gql/resolver";
import { resolvers as userresolver } from "./user/gql/resolver";
//import { resolver as boostresolver } from "./boost/gql/resolver";

// --------------------- Merge --------------------- //

const typeDefs = [
  commonTypeDefs,
  userTypeDefs,
  teamTypeDefs,
  orderTypeDefs,
  ratingTypeDefs,
  preferencesTypeDefs,
  //boostTypeDefs,
];

const resolvers = [
  commonresolver,
  userresolver,
  teamresolver,
  orderresolver,
  ratingresolver,
  preferencesresolver,
  //boostresolver,
];

// --------------------- Schema Build --------------------- //

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
