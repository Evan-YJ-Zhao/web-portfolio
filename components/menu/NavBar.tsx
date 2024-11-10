'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import navLinks, { NavLink } from "./NavLinks";
import { homeImg } from "@/utils/images";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100 py-0">
      <div className="flex-1 pl-[2%]">
        <a className="relative btn btn-ghost phone-sm:w-[10%] tablet:w-[5%] p-0" href="/">
          <Image src={homeImg} alt="Home" fill />
        </a>
      </div>
      <div className="flex-none laptop:pr-[2%]">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map(
            (n: NavLink) =>
              n.href !== pathname &&
              !n.isDisabled && (
                <li key={n.id}>
                  <Link className="phone-sm:max-laptop:px-1 laptop:text-base font-bold" href={n.href}>{n.name}</Link>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
