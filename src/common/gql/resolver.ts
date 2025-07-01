import { ICommonService } from "../service/service";

export type CommonContext = {
  commonService: ICommonService;
};

export const resolver = {
  Query: {},
  Mutation: {},
};
