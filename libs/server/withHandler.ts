import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
type method = "GET" | "POST" | "DELETE";
interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: ConfigType) {
  //바로 이 아래 함수가 nextJS가 찾고 있는 함수다.
  //nextJS가 실행 할 함수다.
  //근데 아직 handler은 사용 안됐었음.
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    // res.json({hello: true});
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end(); //405 = bad request
      //이 작업을 했으면 사용자가 url(http://localhost:3000/api/users/enter)로 들어오면 405에러 떠야지.
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Please log in." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error }); //server error
    }
  };
}
//handler주변에 shell을 든거.
//
//Q: nico! what is the specific reason for making withHandler util? I understand withHandler is useful but i wand to more specific cases...! Thanks :)
//A일종의 middleware 와 같은 느낌입니다.
// 만약 withHandler가 없었다면, 개발자가 method를 잘못 요청했을 때
//validation을 할 수 없지만, withHandler를 통해서 method validation이
//가능해졌습니다. 이와 같이 enter.tsx에서 handler() 를 실행하기전에
//추가 하고 싶은 작업을 개발자가 withHandler에서 수행하고
//그 이후에 enter의 handler를 실행시키게 해줍니다.
//그래서 helper function으로 표현한 것 같아요.

// @masterhyuns express(유튜브 클론코딩) 할 때도 나오는 내용인데요. 실질적으로 res.json()이나 res.status(200).end() 얘네들 자체가 return이 void 입니다.
// (property) json: (body: any) => void
// return을 붙여주는 이유는 명확하게 여기가 끝나는 곳이다 라는 표시를 해주려고 붙이는거구요. 사실상 return res.json()은 아래와 같습니다.
// return void; = return;
// 아무것도 리턴하지 않고 있는게 맞죠???
// 그래서 return res.json()이 아니라 res.json() 라고 써도 동작합니다. 근데 IDE의 도움을 좀 더 받고싶다면 return을 무조건 붙이는게 더 좋은 것 같더라구요. 물론 여러 다른 이유도 있구요.
