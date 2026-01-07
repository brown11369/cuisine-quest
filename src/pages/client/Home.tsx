import Banner from "@/components/client/Banner";
import ProductCard from "@/components/client/ProductCard";
import {
  MdDeliveryDining,
  MdAccessTimeFilled,
  MdPayments,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorBoundary from "@/components/errors/ErrorBoundry";
import ComponentErrorFallback from "@/components/errors/ComponentErrorFallback";

const fetchPublishedProducts = async () => {
  const res = await api.getPublishedProducts();
  if (res.status === "error") throw new Error(res.message);
  return res.data?.productData ?? [];
};

const categories = [
  { img: "1.png", name: "Rasgulla" },
  { img: "2.png", name: "Lassi" },
  { img: "3.png", name: "Malai Chaap" },
  { img: "4.png", name: "Pizza" },
  { img: "5.png", name: "Samosa" },
  { img: "6.png", name: "Litti Chokha" },
];

const features = [
  {
    icon: MdDeliveryDining,
    title: "Free Delivery",
    text: "For all orders over ₹350",
  },
  {
    icon: MdAccessTimeFilled,
    title: "30 Min Delivery",
    text: "Fast & fresh",
  },
  {
    icon: MdPayments,
    title: "Secure Payment",
    text: "100% secure payment",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "24/7 Support",
    text: "Dedicated support",
  },
];

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", "published"],
    queryFn: fetchPublishedProducts,
  });

  return (
    <>
      {/* Banner */}
      <Banner />

      {/* Features */}
      <section className="container mx-auto py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <item.icon className="text-3xl text-primary mb-2" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto py-10">
        {/* Headline at the top */}
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Top Categories Of The Month
        </h2>

        {/* Categories grid below the headline */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {categories.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg border bg-background text-center hover:shadow-md transition"
            >
              <img
                src={`/media/img/${item.img}`}
                alt={item.name}
                className="h-32 w-full object-cover"
              />
              <h3 className="py-3 text-sm font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-muted/40 py-12">
        <div className="container mx-auto">
          {isLoading && <p>Loading products...</p>}
          {isError && (
            <p className="text-red-500">Error: {(error as Error).message}</p>
          )}

          <ErrorBoundary fallback={ComponentErrorFallback}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {products?.slice(0, 8).map((product: IProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </ErrorBoundary>
        </div>
      </section>

      {/* Advertisement */}
      <section className="container mx-auto py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="rounded-xl bg-cover bg-center p-6 text-white"
            style={{ backgroundImage: "url(/media/img/b1.png)" }}
          >
            <h2 className="text-xl font-semibold">
              Fresh Summer With <br /> Pineapple Juice
            </h2>
            <p className="mt-2 text-lg font-bold text-red-400">₹120</p>
            <Button className="mt-4">Shop Now</Button>
          </div>

          <div
            className="rounded-xl bg-cover bg-center p-6 text-black"
            style={{ backgroundImage: "url(/media/img/a2.png)" }}
          >
            <h2 className="text-xl font-semibold">
              Fresh Vegetable With <br /> Healthy Body
            </h2>
            <p className="mt-2 text-lg font-bold text-red-500">₹350</p>
            <Button className="mt-4">Shop Now</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold">
              Get <span className="text-red-500">25%</span> Discount
            </h2>
            <p className="mt-4 text-muted-foreground">
              Subscribe to receive updates on new arrivals, special offers and
              promotions.
            </p>

            <div className="mt-6 flex max-w-md gap-2 mx-auto md:mx-0">
              <Input placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div>
          </div>

          <img
            src="/media/img/meal.jpg"
            alt="meal"
            className="mx-auto max-w-sm rounded-xl scale-x-[-1]"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
