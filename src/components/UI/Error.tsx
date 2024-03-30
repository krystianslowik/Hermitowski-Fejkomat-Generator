import { FC, useEffect, useState } from "react";

type ErrorProps = {
  errorMessage: string;
};

export const InputError: FC<ErrorProps> = ({ errorMessage }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 100);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!errorMessage) return null;

  return (
    <div
      className={`absolute z-10 items-center p-2 text-sm text-white font-semibold bg-red-600 rounded-md shadow-lg ${
        shouldAnimate ? "animate-fadeIn" : ""
      }`}
    >
      <span className="">{errorMessage}</span>
    </div>
  );
};
