import { UpdateUserInput } from "../gql/user-gen.gql";
import { IUserRepository } from "../repository/repository";
import { CreateUserInput, User } from "../types";

export interface IUserService {
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(input: Partial<User>): Promise<User>;
  updateUser(input: UpdateUserInput): Promise<User>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUserById(id: string): Promise<User | undefined> {
    return await this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async createUser(input: CreateUserInput): Promise<User> {
    return await this.userRepository.createUser(input);
  }

  async updateUser(input: UpdateUserInput): Promise<User> {
    return await this.userRepository.updateUser(input);
  }
}
