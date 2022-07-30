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

export interface Project {
  title: String;
  description: String;
  image: {
    url: String;
    alt: String;
  };
  tags: String[];
  link: {
    url: String;
    github: String;
  };
}
