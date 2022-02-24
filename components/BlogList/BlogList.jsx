import Link from "next/link";
import Image from "next/image";

import styles from "./BlogList.module.css";

const BlogList = ({ posts }) => {
  return (
    <ul className={styles.container}>
      {posts?.map((post, index) => (
        <li key={index} className={styles.blog_item}>
          <Link href={"/blog/" + post.slug}>
            <a className={styles.blog_link}>
              <div className={styles.blog_link_content}>
                <h2>{post.frontMatter.title}</h2>
                <p>{post.frontMatter.description}</p>
                <p>{post.frontMatter.published}</p>
              </div>
              <div className={styles.blog_link_image}>
                <Image
                  src={post.frontMatter.thumbnailUrl}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                />
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
