import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: {
    //   user: true,
    // },
  });
  if (!foundToken) return res.status(404).end(); //return 안쓰면 타입스크립트는 여기서 끝난 다는거 모름
  //토큰이 있으면, user에 userid넣어준다.
  req.session.user = {
    id: foundToken?.userId,
  };
  await req.session.save(); //Encrypts the session data and sets the cookie.
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  res.json({ ok: true });
}
export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
// export default withIronSessionApiRoute(withHandler("POST", handler), {
//   cookieName: "carrotsession",
//   password:
//     "514651468914756147864551465146891475614786455146514689147561478645",
// });
