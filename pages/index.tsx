import useUser from "@libs/client/useUser";
import type { NextPage } from "next";
// import { Head } from "next/document"; 이거 하면 안됨.
import Head from "next/head";
import FloatingButton from "../components/floating-button";
import Item from "../components/item";
import Layout from "../components/layout";
import useSWR, { SWRConfig } from "swr";
import { Product } from "@prisma/client";
import client from "@libs/server/client";
// import Image from "next/image";
// import myImage from "../public/local.jpg";
export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar seoTitle="Home">
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data
          ? data?.products?.map((product, i) => (
              <Item
                id={product.id}
                key={product.id}
                title={product.name}
                price={product.price}
                comments={1}
                hearts={product._count?.favs || 0}
                image={product.image}
              />
            ))
          : "Loading....."}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
      {/* <Image src={myImage} placeholder="blur" quality={100}/> */}
    </Layout>
  );
};
const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  console.log("products in Page", products);
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};
export async function getServerSideProps() {
  console.log("SSR");
  const products = await client.product.findMany({});
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
export default Page;
