module.exports = {
  reactStrictMode: true,
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});

module.exports = {
  async headers() {
    return [
      {
        source: "/fonts/inter-v8-latin-regular.woff2",
        headers: [
          {
            key: "Cache-control",
            value: "public, immutable, max-age=31536000",
          },
        ],
      },
      {
        source: "/fonts/inter-v8-latin-900.woff2",
        headers: [
          {
            key: "Cache-control",
            value: "public, immutable, max-age=31536000",
          },
        ],
      },
    ];
  },
};
