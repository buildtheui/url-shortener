import { Response } from 'express';
import { Presenter } from '@common';
import { UserData } from '../../domain/entities/user';

export class SignInPresenter extends Presenter {
  transform(response: UserData, expressResponse: Response): void | object {
    const { password, ...restUser } = response;
    return expressResponse.status(200).json(restUser);
  }
}
