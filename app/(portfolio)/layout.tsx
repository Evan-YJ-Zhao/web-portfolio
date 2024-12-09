import NavBar from "@/components/layout/Navigation/NavBar";

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <hr className="w-11/12 tablet:h-[1px] mb-2 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="flex-grow">{children}</div>
    </>
  );
};

export default PortfolioLayout;
