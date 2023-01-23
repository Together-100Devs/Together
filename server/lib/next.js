import next from "next";

// This code initializes next.js app (The entry point of the application)
const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : process.env.HOST;
const port = Number(process.env.PORT) || 2121;
const nextApp = next({ dev, hostname, port })

export const prepareNextApp = async () => {
  await nextApp.prepare();

  return nextApp;
}