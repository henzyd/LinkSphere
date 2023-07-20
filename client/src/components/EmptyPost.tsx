const EmptyPost = () => {
  return (
    <section
      id="EmptyPost"
      className="bg-white flex flex-col rounded-lg shadow h-fit p-6 w-full gap-4 justify-center items-center"
    >
      <figure className="w-[60%]">
        <img
          src="https://res.cloudinary.com/dkok98flj/image/upload/v1689818604/illustrations/undraw_Post_re_mtr4_veuf9a.png"
          alt="no-post"
          className="w-full h-full object-contain"
        />
      </figure>
      <p className="text-[1rem] text-center">
        No posts to show, create a post.
      </p>
    </section>
  );
};

export default EmptyPost;
