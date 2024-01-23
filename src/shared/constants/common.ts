export const VALIDATION_PIPE_OPTIONS = { transform: true };

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export const ROLES_KEY = 'roles';

export enum USER_ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

export enum PROVIDER {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  PASSWORD = 'password',
}

export const MESSAGES = {
  ERROR: {
    NOT_PERMISSION: 'You have not permission!',
    BANNED: 'You have been banned.',
    BAD_REQUEST: 'Bad request.',
    SOME_THING_WRONG: 'Something went wrong.',
  },
};

export const REGEX_PARTERN = {
  NAME_TAG: new RegExp(/^[a-zA-Z0-9._-\s]+$/),
  URL: new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/),
  PASSWORD: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+{}|/:;",.?<>\[\]`])[A-Za-z\d~!@#$%^&*()_+{}|/:;",.?<>\[\]]{8,}$/,
  ),
};

export const MSGS_USER = {
  EU001: { message: 'User must be verified.', code: 'EU001' },
  EU002: { message: 'Wrong email or password.', code: 'EU002' },
};
