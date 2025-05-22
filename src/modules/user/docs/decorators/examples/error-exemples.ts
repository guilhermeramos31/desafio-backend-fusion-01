export const ErrorExamples = (
  error: string,
  statusCode: number,
  message: string | string[],
) => {
  return {
    message,
    error,
    statusCode,
  };
};
