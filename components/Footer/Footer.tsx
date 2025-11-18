import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="pt-4 mt-14 border-t border-gray-200 flex gap-4 text-gray-500 text-sm">
      <Link href="https://github.com/tbguest" target="_blank">
        github
      </Link>
      <Link href="https://www.linkedin.com/in/tristanguest/" target="_blank">
        linkedin
      </Link>
    </footer>
  );
};
