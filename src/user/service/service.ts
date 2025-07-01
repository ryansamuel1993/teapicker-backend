import { User } from "@prisma/client";

import { IUserRepository } from "../repository/repository";

export interface IUserService {
  get(id: string): Promise<User | undefined>;
  getAllUser(): Promise<User[]>;
  createUser(input: Partial<User>): Promise<User>;
  updateUser(input: User): Promise<User>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async get(id: string): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(input: Partial<User>): Promise<User> {
    return this.userRepository.create(input);
  }

  async updateUser(input: Partial<User> & { id: string }): Promise<User> {
    return this.userRepository.update(input.id, input);
  }
}
