import { CheckUserExistsInput, UpdateUserInput } from "../gql/user-gen.gql";
import { IUserRepository } from "../repository/repository";
import { CreateUserInput, User } from "../types";
import DataLoader from "dataloader";

export interface IUserService {
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(input: Partial<User>): Promise<User>;
  updateUser(input: UpdateUserInput): Promise<User>;
  checkUserExists(input: CheckUserExistsInput): Promise<boolean>;
}

export class UserService implements IUserService {
  private emailAndNameLoader: DataLoader<"email" | "name", Set<string>>;

  constructor(private userRepository: IUserRepository) {
    this.emailAndNameLoader = this.createUserExistenceListLoader();
  }

  private createUserExistenceListLoader = () =>
    new DataLoader<"email" | "name", Set<string>>(async () => {
      const users = await this.userRepository.getAllUsers();

      const emailSet = new Set<string>();
      const nameSet = new Set<string>();

      users.forEach(({ email, name }) => {
        if (email) {
          emailSet.add(email.toLowerCase());
        }

        if (name) {
          nameSet.add(name.toLowerCase());
        }
      });

      return ["email", "name"].map((type) =>
        type === "email" ? emailSet : nameSet,
      );
    });

  async checkUserExists(input: CheckUserExistsInput): Promise<boolean> {
    const { email, name } = input;

    const [emailSet, nameSet] = await Promise.all([
      this.emailAndNameLoader.load("email"),
      this.emailAndNameLoader.load("name"),
    ]);

    const emailExists = !!email && emailSet.has(email.toLowerCase());
    const nameExists = !!name && nameSet.has(name.toLowerCase());

    return emailExists || nameExists;
  }

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
