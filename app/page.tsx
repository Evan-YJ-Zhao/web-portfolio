import FloatingTriangleGroup from "@/components/FloatingTriangle/FloatingTriangleGroup";

type MenuItem = {
  id: number;
  itemName: string;
  href?: string;
  isDisabled: boolean;
};

const menuItems: ReadonlyArray<MenuItem> = Object.freeze([
  { id: 0, itemName: "About Me", href: "/about-me", isDisabled: false },
  { id: 1, itemName: "Contact Me", href: "/contact-me", isDisabled: false },
  { id: 2, itemName: "Other", isDisabled: true },
]);

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="absolute z-10 top-1/4">
        <nav>
          <ul
            className="menu menu-lg bg-neutral rounded-box relative justify-center apply-border 
                        phone-sm:w-48 phone-lg:w-52 tablet:w-80 laptop:w-96"
          >
            {menuItems.map((menuItem: MenuItem) => (
              <li
                key={menuItem.id}
                className={menuItem.isDisabled ? "disabled" : ""}
              >
                <a
                  className={
                    menuItem.isDisabled
                      ? "text-center font-bold font-mono block z-10 btn-main-menu-gray-effect"
                      : "text-center font-bold font-mono block z-10 btn-main-menu-gradient-effect"
                  }
                  href={menuItem.href}
                >
                  {menuItem.itemName}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="w-screen h-dvh absolute top-0 overflow-hidden">
        <FloatingTriangleGroup/>
      </div>
    </div>
  );
}
