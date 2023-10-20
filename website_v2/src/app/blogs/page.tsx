import Link from "next/link";
import {getSortedBlogsData} from "../../../lib/blogs";
import Image from "next/image";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "OpenMentorship - All Blogs",
  description:
    "This is the homepage for the blogs at OpenMentorship. This page lists all the blog posts available at OpenMentorship.",
  keywords:
    "blogs, openmentorship, openmentorship guidelines, openmentorship blogs, openmentorship articles",
};

const Page = async () => {
  const allBlogsData = getSortedBlogsData();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      <h1
        className="w-full max-w-6xl mx-auto pt-16 text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold"
        data-cy="blogs-title-h1"
      >
        All Blogs
      </h1>
      <div className="flex flex-col gap-8 mt-8" data-cy="blogs-card-container">
        {allBlogsData.map(blog => (
          <Link
            href={"/blogs/" + blog.id}
            key={blog.id}
            className="card sm:card-side bg-base-100 border border-base-300 hover:shadow-md"
            data-cy="blogs-card"
          >
            <figure className="w-full min-w-[200px] sm:min-w-[300px] sm:max-w-xs aspect-video relative">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="aspect-video object-cover"
                data-cy="blogs-card-thumbnail"
              />
            </figure>
            <div className="card-body p-4 lg:px-8">
              <h2 className="card-title" data-cy="blogs-card-title">
                {blog.title}
              </h2>
              <p data-cy="blogs-card-description">
                {blog.description.length > 250
                  ? blog.description.slice(0, 250) + "..."
                  : blog.description}
              </p>
              <p className="text-sm font-semibold" data-cy="blogs-card-author">
                ~ {blog.author}
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-link normal-case"
                  data-cy="blogs-card-read-more-button"
                >
                  Read more
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
