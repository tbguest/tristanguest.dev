import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="pt-4 mt-14 border-t border-gray-200 flex flex-wrap gap-4 text-gray-500 text-sm">
      <Link href="/portfolio">portfolio</Link>
      <Link href="/resume">resume</Link>
      <Link href="mailto:tristanguest@gmail.com">email</Link>
      <Link href="https://github.com/tbguest" target="_blank">
        github
      </Link>
      <Link href="https://www.linkedin.com/in/tristanguest/" target="_blank">
        linkedin
      </Link>
    </footer>
  );
};
