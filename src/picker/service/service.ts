import { IPickerRepository } from "../repository/repository";

export interface IPickerService {}

export class PickerService implements IPickerService {
  constructor(private pickerRepository: IPickerRepository) {}
}
