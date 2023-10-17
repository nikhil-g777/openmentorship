import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const blogsDirectory = path.join(process.cwd(), "blogs");

export function getSortedBlogsData() {
  // Get file names under /blogs
  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      date: matterResult.data.date,
      title: matterResult.data.title,
      description: matterResult.data.description,
      thumbnail: matterResult.data.thumbnail,
      author: matterResult.data.author,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get Post Data
export async function getBlogData(id: string) {
  const fullPath = path.join(blogsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    date: matterResult.data.date,
    title: matterResult.data.title,
    description: matterResult.data.description,
    thumbnail: matterResult.data.thumbnail,
    author: matterResult.data.author,
    contentHtml,
    ...matterResult.data,
  };
}
