module.exports = {
  apps: [
    {
      name: "socialapp-server",
      script: "./index.js",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT,
        MONGODB_URI: process.env.MONGODB_URI,
        REDIS_URL: process.env.REDIS_URL,
        JWT_SECRET: process.env.JWT_SECRET,
      },
    },
  ],
};
