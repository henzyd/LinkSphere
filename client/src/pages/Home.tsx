import Seo from "~/components/Seo";
import { Create, Empty } from "~/components/post";

const Home = () => {
  const postsData = [];
  return (
    <>
      <Seo title="Home" description="Home page" />
      <main className="flex flex-col gap-4">
        <Create />
        <hr className="h-[1px] bg-neutral-400 rounded-full w-[86%] mx-auto" />
        {postsData.length >= 1 ? (
          <div className="flex flex-col gap-4"></div>
        ) : (
          <Empty />
        )}
      </main>
    </>
  );
};

export default Home;
