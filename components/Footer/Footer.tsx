import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-4 border-t border-gray-200 flex gap-4 text-gray-500 text-sm">
      <Link href="https://github.com/tbguest" target="blank">
        github
      </Link>
      <Link href="https://www.linkedin.com/in/tristanguest/" target="blank">
        linkedin
      </Link>
      <Link href="https://x.com/tristan_guest" target="blank">
        x
      </Link>
    </footer>
  );
};

export default Footer;
