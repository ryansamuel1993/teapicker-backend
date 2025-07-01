import { Staff } from "@prisma/client";

import { IStaffRepository } from "../repository/repository";

export interface IStaffService {
  get(id: string): Promise<Staff | undefined>;
  getAllStaff(): Promise<Staff[]>;
  createStaff(input: Partial<Staff>): Promise<Staff>;
  updateStaff(input: Staff): Promise<Staff>;
}

export class StaffService implements IStaffService {
  constructor(private staffRepository: IStaffRepository) {}

  async get(id: string): Promise<Staff | undefined> {
    return this.staffRepository.findById(id);
  }

  async getAllStaff(): Promise<Staff[]> {
    return this.staffRepository.findAll();
  }

  async createStaff(input: Partial<Staff>): Promise<Staff> {
    return this.staffRepository.create(input);
  }

  async updateStaff(input: Partial<Staff> & { id: string }): Promise<Staff> {
    return this.staffRepository.update(input.id, input);
  }
}
