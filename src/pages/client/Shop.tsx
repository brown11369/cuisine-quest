import { api } from "@/services/api";
import ProductCard from "@/components/client/ProductCard";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "@/types/products";

const fetchPublishedProducts = async () => {
  const res = await api.getPublishedProducts();

  if (res.status === "error") {
    throw new Error(res.message);
  }

  return res.data?.productData ?? [];
};

const Shop = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", "published"],
    queryFn: fetchPublishedProducts,
  });

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="container food-container">
      <div className="container-center">
        {products?.map((product: IProduct) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
