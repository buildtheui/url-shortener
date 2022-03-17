import { UserData } from '@auth/domain/entities/user';
import { Presenter } from '@common';
import { Response } from 'express';

export class SignUpPresenter extends Presenter {
  transform(response: UserData, expressResponse: Response): void | object {
    const { password, ...rest } = response;
    expressResponse.status(200).json(rest);
  }
}
