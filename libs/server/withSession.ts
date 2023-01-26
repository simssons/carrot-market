import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession(handler: any) {
  //ssr에서 인증 가능하게 함.
  return withIronSessionSsr(handler, cookieOptions);
}
//ironsession에게 req를 제공하면
//iron은 쿠키를 가져오고 해독한다.
//그리고 그 결과를 req?.session.user 내부에 넣어주는 것.
