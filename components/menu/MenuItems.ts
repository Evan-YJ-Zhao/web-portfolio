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

export type { MenuItem };
export default menuItems;
