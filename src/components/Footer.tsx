import Consent from "./Consent";

export const Footer = () => {
  return (
    <footer className="text-sm flex justify-center items-center py-2">
      <div className="bg-stone-500 text-white  px-4 py-2 rounded shadow">
        &copy; {new Date().getFullYear()} slovik |{" "}
        <a
          href="https://github.com/krystianslowik/Hermitowski-Fejkomat-Generator"
          className=" hover:underline"
        >
          GitHub
        </a>
      </div>
      <Consent />
    </footer>
  );
};
