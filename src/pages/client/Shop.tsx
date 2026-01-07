import { api } from "@/services/api";
import ProductCard from "@/components/client/ProductCard";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "@/types/products";
import ErrorBoundary from "@/components/errors/ErrorBoundry";
import ComponentErrorFallback from "@/components/errors/ComponentErrorFallback";

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
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={ComponentErrorFallback}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Shop;
