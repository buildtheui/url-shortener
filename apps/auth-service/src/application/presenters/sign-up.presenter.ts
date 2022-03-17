import { Presenter } from '@common';
import { Response } from 'express';

export class SignUpPresenter extends Presenter {
  transform(response: object, expressResponse: Response): void | object {
    expressResponse.status(200).json(response);
  }
}
