import mail from "@sendgrid/mail";
// import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
// import client from "../../@libs/server/client";
// import withHandler from "../../@libs/server/withHandler";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

// mail.setApiKey(process.env.SENGRID_KEY!);

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

//매우중요
//무조건 export default여야 NextJS에서 라우터로 잡아줌
//어떤 코드를 짜든, return 값은 nextjs가 실행 할 function이여야 함.
//그래야 사용자가 url을 호출 할 때, 그 function을 실행하고
//nextjs가 req, res obj를 주겠지.
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: phone + "" } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false }); //400 = bad request
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  /* const user = await client.user.upsert({
    where: {
      //user를 찾기 위한 조건
      ...payload,
    },
    create: {
      //유저 만들 떄 사용할때 사용, 없으면 만들게 됨.
      name: "Anonymous",
      ...payload,
    },
    update: {}, //유저 찾으면 업데이트 ... 업데이트 할일은 없으니 안함
  }); */
  //위 코드는 아래 connectOrCreate때문에 안쓰게됨
  console.log("user", user);
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            //user를 찾기 위한 조건
            ...user,
          },
          create: {
            //유저 만들 떄 사용할때 사용, 없으면 만들게 됨.
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log("token", token);
  console.log("payload", payload);

  /* const user = await client.user.upsert({
        where: {//user를 찾기 위한 조건
            ...(phone ? {phone: +phone} : {}),
            ...(email ? {email} : {}),
        },
        create: {//유저 만들 떄 사용할때 사용, 없으면 만들게 됨.
            name: "Anonymous",
            ...(phone ? {phone: +phone} : {}),
            ...(email ? {email} : {}),
        },
        update:{} //유저 찾으면 업데이트 ... 업데이트 할일은 없으니 안함
    }); */
  /* const user = await client.user.upsert({
        where: {//user를 찾기 위한 조건
            phone: +phone, 
        },
        create: {//유저 만들 떄 사용할때 사용, 없으면 만들게 됨.
            name: "Anonymous",
            phone: +phone,
        },
        update:{} //유저 찾으면 업데이트 ... 업데이트 할일은 없으니 안함
    }); */
  /* if(email) {
        user = await client.user.findUnique({
            where: {
                email,
            }
        });
        if(user){
            console.log("Found it");
        }
        if(!user){
            console.log("Did not find. Will create.");
            user = await client.user.create({
                data: {
                    name: "Anonymous",
                    email,
                }
            })
        }
        console.log(user)
    }
    if(phone) {
        user = await client.user.findUnique({
            where: {
                phone: +phone,
            }
        });
        if(user){
            console.log("Found it");
        }
        if(!user){
            console.log("Did not find. Will create.");
            user = await client.user.create({
                data: {
                    name: "Anonymous",
                    phone: +phone,
                }
            })
        }
        console.log(user)
    } */
  if (phone) {
    // twilio 크레딧 아껴야하니까
    /* const message = await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MSID,
            to: process.env.MY_PHONE!,
            body: `Your login token is ${payload}.`
        });
        console.log(message); */
  } else if (email) {
    /* const email = await mail.send({
            from: "simsosns@naver.com",
            to: "simsosns@naver.com",
            subject: " Your Carrot Market Verification Email",
            text: `your token is ${payload}`,
            html: `<strong>your token is ${payload}</strong>`
        });
        console.log(email) */
  }
  return res.json({
    ok: true,
  });
}
export default withHandler({ methods: ["POST"], handler, isPrivate: false });
//nextjs에서 실행될 함수를 customizing 한것임.
