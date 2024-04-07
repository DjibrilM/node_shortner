export const createLoggerMessage = ({
  error: error,
  developerMessage,
}: {
  error: any;
  developerMessage: string;
}) => {
  return {
    code: error.code,
    developerMessage: developerMessage,
    errorMessage: error.message,
    reason: error,
  };
};
