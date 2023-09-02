import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <section
      id="Wrapper"
      className="grid grid-cols-[1fr,3fr,1fr] gap-8 p-7 px-12 h-[inherit] max-w-screen-LargeLaptop mx-auto pb-12"
    >
      <LeftSide />
      <main className="flex flex-col">{children}</main>
      <RightSide />
    </section>
  );
};

export default Wrapper;
