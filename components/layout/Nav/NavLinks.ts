type NavLink = {
  id: number;
  name: string;
  href: string;
  isDisabled: boolean;
};

const navLinks: ReadonlyArray<NavLink> = Object.freeze([
  { id: 0, name: "About Me", href: "/about-me", isDisabled: false },
  { id: 1, name: "Contact Me", href: "/contact-me", isDisabled: false },
  { id: 2, name: "Project 1 ...", href: "/", isDisabled: true },
]);

export type { NavLink };
export default navLinks;
