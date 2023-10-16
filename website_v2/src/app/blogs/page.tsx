import Link from "next/link";
import {getSortedBlogsData} from "../../../lib/blogs";

const Page = async () => {
  const allBlogsData = await getSortedBlogsData();
  return (
    <div>
      {allBlogsData.map(blog => (
        <Link href={"/blogs/" + blog.id} key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.date}</p>
        </Link>
      ))}
    </div>
  );
};

export default Page;
