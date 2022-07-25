import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import path from "path";
import { BlogList } from "../components";
import { BlogPosts } from "../models";

export default function Blog({ posts }: BlogPosts) {
  console.log("staticprops posts", posts);
  return (
    <>
      <Head>
        <title>Tristan Guest - Blog</title>
        <meta></meta>
      </Head>
      {/* <Header /> */}
      <h1>Development Blog</h1>
      <p>
        Here are some recent posts outlining my adventures in web development,
        design, and data science.{" "}
      </p>
      <BlogList posts={posts} />
    </>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};
