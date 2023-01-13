import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr/_internal";

export default function App({ Component, pageProps }: AppProps) {
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
    </SWRConfig>
  );
}
// "rollbackOnError: true"
// rollbackOnError: should the cache rollback if the remote mutation errors.
