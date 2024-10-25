import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md">
      <Image alt="company logo" src="/logo.svg" width={100} height={200} />
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Header;
