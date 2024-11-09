import NavBar from "@/components/Menu/NavBar";

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PortfolioLayout;
