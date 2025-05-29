import { UserExample } from '@shared/decorators';

export const AuthExample = (message: string) => {
  return {
    message,
    user: UserExample().user,
    token:
      'odmaoskdojafoihfeyt413784nlkfabnufg37421y0adosjknd0auiw6y417384034nbkjfba78t',
  };
};
