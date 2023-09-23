import Seo from "~/components/Seo";
import { Create, Empty, Post } from "~/components/post";
import RightBar from "./RightBar";

const Home = () => {
  const postsData = [{}];
  return (
    <>
      <Seo title="Home" description="Home page" />
      <div className="flex gap-8">
        <main className="flex flex-col gap-4 w-full">
          <Create />
          <hr className="h-[1px] bg-neutral-400 rounded-full w-[86%] mx-auto" />
          {postsData.length > 0 ? (
            postsData.map((item, index) => <Post key={index + 1} {...item} />)
          ) : (
            <Empty />
          )}
        </main>
        <RightBar />
      </div>
    </>
  );
};

export default Home;
