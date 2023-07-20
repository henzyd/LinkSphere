import CreatePost from "../components/CreatePost";
import Seo from "../utils/Seo";

const Home = () => {
  return (
    <>
      <Seo title="Home" description="Home page" />
      <main className="flex flex-col gap-4">
        <CreatePost />
        <hr className="h-[1px] bg-neutral-400 rounded-full w-[86%] mx-auto" />
      </main>
    </>
  );
};

export default Home;
