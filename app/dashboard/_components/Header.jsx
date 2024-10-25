import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image alt="company logo" src="/favicon.svg" height={50} width={70} />
      <UserButton />
    </div>
  );
}

export default Header;
