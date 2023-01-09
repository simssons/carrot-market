import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
// withApiSession으로 감싸기만 하면 serssion.user.id로 유저 정보 읽어 올 수 있다.
// export default withIronSessionApiRoute(withHandler("GET", handler), {
//   cookieName: "carrotsession",
//   password:
//     "514651468914756147864551465146891475614786455146514689147561478645",
// });
