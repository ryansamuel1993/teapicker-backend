import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "src/common/gql/common-gen.gql.ts": {
      schema: ["./src/common/gql/common.gql"],
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: "T",
      },
    },
    "src/rating/gql/rating-gen.gql.ts": {
      schema: ["./src/common/gql/common.gql", "./src/rating/gql/rating.gql"],
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: "T",
      },
    },
    "src/order/gql/order-gen.gql.ts": {
      schema: [
        "./src/common/gql/common.gql",
        "./src/rating/gql/rating.gql",
        "./src/order/gql/order.gql",
      ],
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: "T",
      },
    },

    "src/user/gql/user-gen.gql.ts": {
      schema: ["./src/common/gql/common.gql", "./src/user/gql/user.gql"],
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: "T",
      },
    },

    "src/team/gql/team-gen.gql.ts": {
      schema: [
        "./src/common/gql/common.gql",
        "./src/user/gql/user.gql",
        "./src/team/gql/team.gql",
      ],
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: "T",
      },
    },

    "src/preferences/gql/preferences-gen.gql.ts": {
      schema: [
        "./src/common/gql/common.gql",
        "./src/preferences/gql/preferences.gql",
      ],
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: "T",
      },
    },

    // "src/boost/gql/boost-gen.gql.ts": {
    //   schema: ["./src/common/gql/common.gql", "./src/boost/gql/boost.gql"],
    //   plugins: ["typescript", "typescript-resolvers"],
    //   config: {
    //     maybeValue: "T",
    //   },
    // },
  },
};

export default config;
