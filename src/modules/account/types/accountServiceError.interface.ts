import { AccountServiceErrorCode } from '../constants';

export interface AccountServiceError {
  code: AccountServiceErrorCode;
  message: 'User with such username exists';
}
