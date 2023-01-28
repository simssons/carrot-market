import Document, { Head, Html, Main, NextScript } from "next/document";

export default function MyDocumnet() {
  console.log("Document is running");
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main></Main>
        <NextScript></NextScript>
      </body>
    </Html>
  );
}
/* class CustomDocument extends Document {
  render(): JSX.Element {
    console.log("Document is running");
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
  export default CustomDocument;
} */

//NextJS앱의 html 뼈대를 짜주는 역할
//안의 Main은 Nextjs가 앱 컴포넌트를 랜덩링 해주는 것.
//HTML 뼈대를 짜주는 역할을 하는 파일이라 서버에서 단 한번 실행 됨.
//<Main>안에서 _app.tsx가 들어간다.

// NextJS의 폰트 최적화는 구글 폰트에 한정되어있기 때문에 구글폰트 링크를 써야 함.
// 어떻게 최적화 해줄까?
// 개발자모드에선 확인 안됨.
// 빌드해야 함
