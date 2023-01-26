import useSWR from "swr";
import { Product } from "@prisma/client";
import { ProductWithCount } from "pages";
import Item from "@components/item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}
interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}
export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          comments={1}
          hearts={record.product._count.favs}
          image={record.product.image}
        />
      ))}
    </>
  ) : null;
}
