import { Preferences } from "../../preferences/types";
import { IRatingRepository } from "../../rating/repository/repository";
import { IPreferencesRepository } from "../../preferences/repository/repository";
import { CheckUserExistsInput, UpdateUserInput } from "../gql/user-gen.gql";
import { IUserRepository } from "../repository/repository";
import { CreateUserInput, User } from "../types";
import DataLoader from "dataloader";

export interface IUserService {
  login(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(input: Partial<User>): Promise<User>;
  updateUser(input: UpdateUserInput): Promise<User>;
  checkUserExists(input: CheckUserExistsInput): Promise<boolean>;
  getAverageRating(userId: string): Promise<number | undefined>;
  getUserPreferences(userId: string): Promise<Preferences | undefined>;
}

export class UserService implements IUserService {
  private emailAndNameLoader: DataLoader<"email" | "name", Set<string>>;
  private averageRatingLoader: DataLoader<string, number | undefined>;
  private preferencesLoader: DataLoader<string, Preferences | undefined>;

  constructor(
    private userRepository: IUserRepository,
    private ratingRepository: IRatingRepository,
    private preferencesRepository: IPreferencesRepository,
  ) {
    this.emailAndNameLoader = this.createUserExistenceListLoader();
    this.averageRatingLoader = this.createAverageRatingLoader();
    this.preferencesLoader = this.createPreferencesLoader();
  }

  login(email: string): Promise<User | undefined> {
    return this.userRepository.login(email);
  }

  getAverageRating(userId: string): Promise<number | undefined> {
    return this.averageRatingLoader.load(userId);
  }

  async getUserPreferences(userId: string): Promise<Preferences | undefined> {
    return this.preferencesLoader.load(userId);
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

  private createAverageRatingLoader = () =>
    new DataLoader<string, number | undefined>(async (userIds) => {
      const ratings = await this.ratingRepository.getAverageRatings();
      const ratingMap = new Map<string, number | undefined>();
      ratings.forEach(({ userId, average }) => {
        ratingMap.set(userId, average ?? undefined);
      });

      return userIds.map((id) => ratingMap.get(id) ?? 0);
    });

  private createPreferencesLoader = () =>
    new DataLoader<string, Preferences | undefined>(async (userIds) => {
      const preferences = await this.preferencesRepository.getPreferences();
      const map = new Map(preferences.map((p) => [p?.userId, p]));

      return userIds.map((id) => map.get(id) ?? undefined);
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
