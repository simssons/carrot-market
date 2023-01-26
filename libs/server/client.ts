import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined; //var는 type declaration?
}

const client =
  global.client ||
  // new PrismaClient({ log: ["query", "info", "warn", "error"] });
  new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
//prisma를 node_module에서 가져오지만
//내가 schema.prisma에서 정의한 대로
//타입스크립트 타입정보가 생김
