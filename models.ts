export interface Post {
  frontMatter: {
    slug: String;
    title: String;
    published: Date;
    description: String;
    thumbnailUrl: String;
    thumbnailAlt: String;
    tags: String[];
  };
  slug: String;
}

export interface BlogPosts {
  posts: Post[];
}
