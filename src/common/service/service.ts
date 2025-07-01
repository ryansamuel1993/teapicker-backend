import { ICommonRepository } from "../repository/repository";

export interface ICommonService {}

export class CommonService implements ICommonService {
  constructor(private commonRepository: ICommonRepository) {}
}
