import {getSortedBlogsData} from "../../../../lib/blogs";

const Page = async ({params}: {params: {slug: string}}) => {
  const allBlogsData = await getSortedBlogsData();
  const blog = allBlogsData.find(blog => blog.id === params.slug);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      <div className="mt-8">{blog?.description}</div>
    </div>
  );
};

export default Page;
