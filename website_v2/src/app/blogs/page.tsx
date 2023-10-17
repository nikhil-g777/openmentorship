import Link from "next/link";
import {getSortedBlogsData} from "../../../lib/blogs";
import Image from "next/image";

const Page = async () => {
  const allBlogsData = await getSortedBlogsData();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      <h1 className="w-full max-w-6xl mx-auto pt-16 text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold">
        All Blogs
      </h1>
      <div className="flex flex-col gap-8 mt-8">
        {allBlogsData.map(blog => (
          <Link
            href={"/blogs/" + blog.id}
            key={blog.id}
            className="card sm:card-side bg-base-100 border border-base-300 hover:shadow-md"
          >
            <figure className="w-full min-w-[200px] sm:min-w-[300px] sm:max-w-xs aspect-video relative">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="aspect-video object-cover"
              />
            </figure>
            <div className="card-body p-4 lg:px-8">
              <h2 className="card-title">{blog.title}</h2>
              <p>
                {blog.description.length > 250
                  ? blog.description.slice(0, 250) + "..."
                  : blog.description}
              </p>
              <p className="font-semibold">~ {blog.author}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-link normal-case">Read more</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
