import Image from "next/image";
import Link from "next/link";
import wizardSprite from "../../public/wizard-sprite.png";

export function WizardHomeLink() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="block shrink-0 transition-opacity hover:opacity-80"
    >
      <Image
        src={wizardSprite}
        alt=""
        width={48}
        height={56}
        unoptimized
      />
    </Link>
  );
}
