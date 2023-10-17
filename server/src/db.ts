import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

(async () => {
  try {
    await prisma.$connect();
    console.log("Connected to db");
  } catch (error) {
    console.error("Error occured on db connection\n", error);
  }
})();

prisma.$on("query", (e) => {
  if (process.env.NODE_ENV === "production") {
    console.log("--------------------------------------------------");
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
    console.log("--------------------------------------------------");
  }
});
export default prisma;
