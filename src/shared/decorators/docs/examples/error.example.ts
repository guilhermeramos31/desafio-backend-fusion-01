import { IErrorExample } from '@shared/utils';

export const ErrorExample = ({ error, statusCode, message }: IErrorExample) => {
  return {
    statusCode,
    message,
    error,
  };
};
