import {notFound} from "next/navigation";
import {getBlogData, getSortedBlogsData} from "../../../../lib/blogs";
import Image from "next/image";
import Link from "next/link";

// Types
type Props = {
  params: {
    slug: string;
  };
};

// Get static params
export async function generateStaticParams() {
  const allBlogsData = getSortedBlogsData();
  return allBlogsData.map(blog => ({
    slug: blog.id,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({params}: Props) {
  const blogData = await getBlogData(params.slug);
  const title = "OpenMentorship - " + blogData.title;
  return {
    title: title,
    description: blogData.description,
  };
}

const Page = async ({params}: Props) => {
  const {slug} = params;
  const blogData = await getBlogData(slug);

  // Not found if no data
  if (!blogData) notFound();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      {/* All Blogs & Title */}
      <Link href="/blogs" className="btn btn-link normal-case px-0 pt-16">
        ❮ All Blogs
      </Link>
      <h1 className="w-full max-w-6xl mx-auto text-xl text-left sm:text-heading sm:leading-normal font-bold mt-4">
        {blogData.title}
      </h1>
      {/* Header image */}
      <Image
        src={blogData.thumbnail}
        alt={blogData.title}
        width={1280}
        height={720}
        className="mt-4"
      />
      {/* Author and Date */}
      <div className="flex flex-row gap-8 justify-between py-4">
        <p className="text-xs">
          Written by: <span className="font-semibold">{blogData.author}</span>
        </p>
        <p className="text-xs">{blogData.date}</p>
      </div>
      {/* Markdown Content */}
      <article className="min-w-full prose lg:prose-xl">
        <div
          dangerouslySetInnerHTML={{__html: blogData.contentHtml}}
          className="min-w-full"
        />
      </article>
    </div>
  );
};

export default Page;
