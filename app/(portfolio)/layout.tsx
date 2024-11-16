import NavBar from "@/components/Menu/NavBar";

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <hr className="w-11/12 tablet:h-[1px] mb-2 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
      {children}
    </>
  );
};

export default PortfolioLayout;
