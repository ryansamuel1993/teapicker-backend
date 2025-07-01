import { ResponseStatus } from "../common/gql/common-gen.gql";

export const createSuccessStatus = (): ResponseStatus => {
  return {
    status: "200",
  };
};

export const createBadRequestStatus = (
  message: string,
  code?: string,
): ResponseStatus => {
  return {
    status: "400",
    errorMessage: message,
    code,
  };
};
