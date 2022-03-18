import { IUserDb } from '../domain/contracts/i-user-db';
import { UserData } from '../domain/entities/user';
import { PrismaClient } from './model/prisma/client';
import { Password } from './util/password';

export class userDb implements IUserDb {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findUserByEmail(email: string): Promise<UserData | undefined> {
    const { createdAt, ...userData } =
      (await this.prisma.user.findUnique({
        where: { email },
      })) ?? {};

    return createdAt ? (userData as UserData) : undefined;
  }
  async createUser(user: UserData): Promise<UserData> {
    const { password: rawPassword, ...rest } = user;
    const password = await Password.toHash(rawPassword);

    const { createdAt, ...newUser } = await this.prisma.user.create({
      data: { ...rest, password },
    });

    return newUser;
  }
}
