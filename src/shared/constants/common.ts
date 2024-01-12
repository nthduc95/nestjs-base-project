export const VALIDATION_PIPE_OPTIONS = { transform: true };

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export enum USER_ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

export enum PROVIDER {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  PASSWORD = 'password',
}
