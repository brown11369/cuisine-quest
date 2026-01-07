import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { pushToCart } from "@/redux/slice/cartSlice";
import type { IProduct } from "@/types/products";
import { api } from "@/services/api";
import { toast } from "react-toastify";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: IProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.user.user);

  const addToCart = async (productID: string) => {
    if (!user?.accessToken) {
      return navigate("/authentication");
    }

    try {
      const response = await api.addToCart({
        user: user._id,
        product: productID,
      });

      if (response.status === "success") {
        dispatch(
          pushToCart({
            _id: response.data._id,
            user: user._id,
            product,
            quantity: 1,
          }),
        );
        toast.success("Added to cart");
      } else {
        toast.error(response.message || "Failed to add item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  // Simulate random error for testing ErrorBoundary
  // eslint-disable-next-line react-hooks/purity
  if (Math.random() < 0.1) {
    throw new Error("Random error occurred in ProductCard");
  }

  return (
    <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.imageURL}
          alt={product.altTag || product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-gray-600">
          ₹ {product.price}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(product._id)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
