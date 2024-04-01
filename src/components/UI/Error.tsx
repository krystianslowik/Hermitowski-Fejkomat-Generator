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
      className={`absolute z-10 top-full left-1 mt-[-10px] ml-2 p-2 text-sm text-white font-semibold bg-red-600 rounded-md shadow-lg before:content-[''] before:absolute before:bottom-full before:left-1 before:border-8 before:border-transparent before:border-b-red-600 ${
        shouldAnimate ? "animate-fadeIn" : ""
      }`}
    >
      <span>{errorMessage}</span>
    </div>
  );
};
