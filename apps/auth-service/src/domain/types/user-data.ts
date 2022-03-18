import { UserData } from '../../domain/entities/user';

export type UserSignUpData = UserData;
export type UserSignIpData = Omit<UserData, 'name' | 'id'>;

export interface SignUpResponse {
  user: UserData;
  jwt: string;
}

export type SignInResponse = SignUpResponse;
