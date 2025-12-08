import ProductCard from "../../components/client/ProductCard";
import { useAppSelector } from "@/redux/hooks";

const Shop = () => {
  const products = useAppSelector((store) => store.product.products);

  return (
    <div className="container food-container">
      <div className="container-center">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
