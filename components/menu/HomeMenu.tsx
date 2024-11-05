import navLinks, { NavLink } from "./NavLinks";
import { OptionalClassName } from "@/utils/commonTypes";

const HomeMenu = ({ className }: OptionalClassName) => {
  return (
    <div className={`${className}`}>
      <nav>
        <ul
          className="menu menu-lg bg-neutral rounded-box relative justify-center apply-border 
                        phone-sm:w-48 phone-lg:w-52 tablet:w-80 laptop:w-96"
        >
          {navLinks.map((nav: NavLink) => (
            <li
              key={nav.id}
              className={nav.isDisabled ? "disabled" : ""}
            >
              <a
                className={
                  nav.isDisabled
                    ? "text-center font-bold font-mono block z-10 btn-main-menu-gray-effect"
                    : "text-center font-bold font-mono block z-10 btn-main-menu-gradient-effect"
                }
                href={nav.href}
              >
                {nav.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HomeMenu;
