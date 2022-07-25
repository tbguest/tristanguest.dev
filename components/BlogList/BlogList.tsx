import Link from "next/link";
import { BlogPosts } from "../../models";
import { dateToString } from "../helpers";
import styles from "./BlogList.module.css";

const BlogList = ({ posts }: BlogPosts) => {
  return (
    <ul className={styles.container}>
      {posts?.map((post, index) => (
        <li key={index} className={styles.blog_item}>
          <Link href={"/blog/" + post.slug}>
            <a className={styles.blog_link}>
              {/* <div className={styles.image_container}>
                <Image
                  src={post.frontMatter.thumbnailUrl}
                  alt={post.frontMatter.thumbnailAlt}
                  layout="fill"
                  className={styles.image}
                />
              </div> */}
              <div className={styles.blog_link_content}>
                <>
                  <h2>{post.frontMatter.title}</h2>
                  <p className={styles.small_text}>
                    <small>{dateToString(post.frontMatter.published)}</small>
                  </p>
                </>
                <p>{post.frontMatter.description}</p>
                <span className={styles.keywords_wrapper}>
                  {post.frontMatter.tags.map((tag) => (
                    <span className={styles.keywords} key={String(tag)}>
                      <small>{tag}</small>
                    </span>
                  ))}
                </span>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
