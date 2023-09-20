import Seo from "~/components/Seo";
import { Create, Empty, Post } from "~/components/post";

const Home = () => {
  const postsData = [{}];
  return (
    <>
      <Seo title="Home" description="Home page" />
      <main className="flex flex-col gap-4">
        <Create />
        <hr className="h-[1px] bg-neutral-400 rounded-full w-[86%] mx-auto" />
        {postsData.length > 0 ? <Post /> : <Empty />}
      </main>
    </>
  );
};

export default Home;
