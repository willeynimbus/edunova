import { BellIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Separator } from "../ui/separator";

const Header = () => {
  return (
    <section className="sticky top-0 z-40 bg-white">
      <header className="flex items-center justify-between h-[88px] p-8 sticky top-0">
        <div className="w-full h-[48px]">
          <h1 className="text-[38px] font-bold leading-[47.5px] text-[#6941C6]">
            PEOPLE.CO
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size={"icon"}>
            <BellIcon />
          </Button>
          <div className="flex items-center justify-center gap-1">
            <Image src="/Ellipse.png" alt="" width={30} height={30} />
            <h2 className="text-nowrap font-normal text-[16px] leading-[20px] items-center">
              Jane Doe
            </h2>
          </div>
        </div>
      </header>
      <div className="h-0 min-w-screen border"></div>
    </section>
  );
};

export default Header;
