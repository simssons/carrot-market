import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  if (req.method === "POST") {
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        // https://developers.cloudflare.com/stream/stream-live/start-stream-live/
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":${name}},"recording": { "mode": "automatic", "timeoudSeconds":10 }}`,
        }
      )
    ).json();
    const stream = await client.stream.create({
      data: {
        cloudflareId: uid, //비디오 보기 위함
        cloudflareKey: streamKey, // 방송의 오너에게 줘야 함.
        cloudflareUrl: url, // 방송의 오너에게 줘야 함.
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  }
  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      take: 10,
      skip: 10,
    });
    res.json({ ok: true, streams }); //temp
  }
}
export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
