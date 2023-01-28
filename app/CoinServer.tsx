import { Suspense } from "react";
const cache: any = {};
function fetchData(url: string) {
  if (!cache[url]) {
    throw Promise.all([
      fetch(url)
        .then((r) => r.json())
        .then((json) => (cache[url] = json())),
      new Promise((resolve) => setTimeout(resolve, Math.random() * 10555)),
    ]);
  }
  return cache[url];
}
function Coin({ id, name, symbol }: any) {
  const {
    quotes: {
      USD: { price },
    },
  } = fetchData(`https://api.coinpaprika.com/v1/tickers/${id}`);
  console.log(price);
  return (
    <span>
      {name} / {symbol}: ${price}
    </span>
  );
}
// let finished = false;
function List() {
  /* if (!finished) {
    throw Promise.all([
      new Promise((resolve) => setTimeout(resolve, 3000)),
      new Promise((resolve) => {
        finished = true;
        resolve("");
      }),
    ]);
  }
  console.log("im rendered on the server only"); */
  const coins = fetchData("https://api.coinpaprika.com/v1/coins");
  return (
    <div>
      <h4>List i done</h4>
      <ul>
        {coins.slice(0, 10).map((coin: any) => (
          <li key={coin.id}>
            <Suspense fallback={`Coin ${Coin.name} is loading`}>
              <Coin {...coin} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default function Coins() {
  return (
    <div>
      <h1>Welcome to RSC</h1>
      <Suspense fallback="Rendering in my server...">
        <List />
      </Suspense>
    </div>
  );
}
// export const config = {
//   runtime: "experimental-edge",
// };
