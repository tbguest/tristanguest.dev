module.exports = {
  reactStrictMode: true,
};

module.exports = {
  async headers() {
    return [
      {
        source: "/fonts/Inter-roman.var.woff2",
        headers: [
          {
            key: "Cache-control",
            value: "public, immutable, max-age=31536000",
          },
        ],
      },
      {
        source: "/fonts/Inter-italic.var.woff2",
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
