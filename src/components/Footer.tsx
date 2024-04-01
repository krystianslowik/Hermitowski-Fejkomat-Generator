export const Footer = () => {
  const date = new Date(Date.now());

  return (
    <footer className="text-sm flex justify-center items-center py-2">
      <div className="bg-stone-500 text-white  px-4 py-2 rounded shadow">
        &copy; {new Date().getFullYear()} slovik
      </div>
    </footer>
  );
};
