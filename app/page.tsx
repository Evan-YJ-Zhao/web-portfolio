import FloatingTriangleGroup from "@/components/FloatingTriangle/FloatingTriangleGroup";

type MenuItem = {
  id: number;
  itemName: string;
  href?: string;
  isDisabled: boolean;
};

const menuItems: ReadonlyArray<MenuItem> = Object.freeze([
  { id: 1, itemName: "About Me", href: "/about-me", isDisabled: false },
  { id: 2, itemName: "Contact Me", href: "/contact-me", isDisabled: false },
  { id: 3, itemName: "Other", isDisabled: true },
]);

export default function Home() {
  return (
    <div>
      <div className="justify-center top-40 relative items-center flex z-10">
        <nav>
          <ul className="menu menu-lg bg-neutral rounded-box w-96 text-lg relative justify-center add-border">
            {menuItems.map((menuItem: MenuItem) => (
              <li
                key={menuItem.id}
                className={menuItem.isDisabled ? "disabled" : ""}
              >
                <a
                  className={
                    menuItem.isDisabled
                      ? "text-center block z-10 btn-main-menu-gray-effect"
                      : "text-center block z-10 btn-main-menu-gradient-effect"
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
        <FloatingTriangleGroup triangleNums={10} />
      </div>
    </div>
  );
}
