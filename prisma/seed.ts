import { PrismaClient } from "@prisma/client";
// next.js의 바깥쪽

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        cloudflareId: "",
        cloudflareUrl: "",
        cloudflareKey: "",
        user: {
          connect: {
            id: 1, //내 아이디
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}
main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
