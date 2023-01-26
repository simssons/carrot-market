import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    const apiTest = await fetch(
      `http://localhost:3000/api/revalidate?secret=${process.env.ODR_TOKEN}`,
      {
        method: "POST",
      }
    );
    console.log("apiTest", apiTest);

    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;
    if (latitude && longitude) {
      const parsedLatitude = parseFloat(latitude.toString());
      const parsedLongitude = parseFloat(longitude.toString());

      const posts = await client.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              wonderings: true,
              answers: true,
            },
          },
        },
        where: {
          latitude: { gte: parsedLatitude - 0.01, lte: parsedLatitude + 0.01 },
          longitude: {
            gte: parsedLongitude - 0.01,
            lte: parsedLongitude + 0.01,
          },
        },
      });
      res.json({
        ok: true,
        posts,
      });
    } else {
      res.json({
        ok: false,
      });
    }
  }
}
export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
