module.exports = {
  reactStrictMode: true,
};

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
