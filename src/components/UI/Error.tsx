import { FC } from "react";

type ErrorProps = {
  errorMessage: string;
};

export const InputError: FC<ErrorProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <div className="mt-1 text-sm text-red-600 border-red-500 rounded-md">
      {errorMessage}
    </div>
  );
};

export default InputError;
