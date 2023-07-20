import Seo from "../utils/Seo";
import CreatePost from "../components/CreatePost";
import EmptyPost from "../components/EmptyPost";

const Home = () => {
  const postsData = [];
  return (
    <>
      <Seo title="Home" description="Home page" />
      <main className="flex flex-col gap-4">
        <CreatePost />
        <hr className="h-[1px] bg-neutral-400 rounded-full w-[86%] mx-auto" />
        {postsData.length >= 1 ? (
          <div className="flex flex-col gap-4"></div>
        ) : (
          <EmptyPost />
        )}
      </main>
    </>
  );
};

export default Home;
