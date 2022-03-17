import { UserData } from '../../domain/entities/user';

export type UserSignUpData = UserData;

export interface SignUpResponse {
  user: UserData;
  jwt: string;
}
