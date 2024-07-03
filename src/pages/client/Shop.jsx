import ProductCard from "../../components/client/ProductCard";
import { useSelector } from "react-redux";

const Shop = () => {
    const products = useSelector(store => store.product.products)

    return (
        <div className="container food-container">
            <div className="container-center">
                {products?.map((product) => <ProductCard key={product?._id} product={product} />)}
            </div>
        </div>
    )
}

export default Shop;