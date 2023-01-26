import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr/_internal";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  console.log("app is running");
  return (
    <SWRConfig
      value={{
        //refreshInterval: 2000, //2초마다 리프레쉬 SWR에 있는 모든 쿼리에 적용.
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
      {/* beforeInteractive = 페이지를 다 불러와서 상호작용 하기 전에 스크립트
      불러옴 afterInteractive = 기본값 = 페이지 다 불러오고 나서 스크립트 불러옴
      lazyOnload = 다른 모든 데이터나 리소스 불러오고 나서 스크립트 불러옴,
      좋아요가 몇개인지 보려고 페이스북 SDK불러올때 쓰면 좋음 */}
      {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          //@ts-ignore
          window.fbAsyncInit = function () {
            //@ts-ignore
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v15.0",
            });
          };
        }}
      /> */}
    </SWRConfig>
  );
}
// "rollbackOnError: true"
// rollbackOnError: should the cache rollback if the remote mutation errors.
