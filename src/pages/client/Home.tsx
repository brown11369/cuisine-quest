import "./home.css";
import ProductCard from "@/components/client/ProductCard";
import Banner from "@/components/client/Banner";
import {
  MdDeliveryDining,
  MdAccessTimeFilled,
  MdPayments,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "@/types/products";
import { toast } from "react-toastify";

const fetchPublishedProducts = async () => {
  const res = await api.getPublishedProducts();

  if (res.status === "error") {
    throw new Error(res.message);
  }

  toast.success("Saved successfully!");
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
      {/* ------- Banner ------- */}
      <Banner />

      {/* ------- Free delivery section ------- */}
      <div className="container">
        <div className="container-center quality">
          <div className="qua-com">
            <MdDeliveryDining className="md-icon" />
            <h3 className="heading">Free Delivery</h3>
            <p className="quality_text">For all orders over Rs. 350</p>
          </div>

          <div className="qua-com">
            <MdAccessTimeFilled className="md-icon" />
            <h3 className="heading">30 Min delivery</h3>
            <p className="quality_text">Fast delivery</p>
          </div>

          <div className="qua-com">
            <MdPayments className="md-icon" />
            <h3 className="heading">Secure Payment</h3>
            <p className="quality_text">100% secure payment</p>
          </div>

          <div className="qua-com">
            <MdOutlineSupportAgent className="md-icon" />
            <h3 className="heading">24/7 Support</h3>
            <p className="quality_text">Dedicated support</p>
          </div>
        </div>
      </div>

      {/* ------- Top categories ------- */}
      <div className="container">
        <div className="container-center direction">
          <div className="heading">Top Categories Of The Month</div>

          <div className="product_container">
            {categories.map((item) => (
              <div className="product" key={item.name}>
                <img
                  className="product_img"
                  src={`./media/img/${item.img}`}
                  alt={item.name}
                />
                <h3 className="product_heading">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------- Food items ------- */}
      <div className="container food-container">
        <div className="container-center">
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            isError && <p>Error loading products: {(error as Error).message}</p>
          )}
          {products &&
            products
              .slice(0, 8)
              .map((product: IProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </div>

      {/* ------- Advertisement ------- */}
      <div className="container advertisement">
        <div className="container-center">
          <div className="advertisement-box left">
            <h2>
              Fresh Summer With <br /> Pineapple juice
            </h2>
            <span className="off">120 Rs./-</span>
            <br />
            <button className="btn ad-btn">Shop Now</button>
          </div>

          <div className="advertisement-box right">
            <h2>
              Fresh Vegetable With <br /> Healthy Body
            </h2>
            <span className="off">350 Rs./-</span>
            <br />
            <button className="btn ad-btn">Shop Now</button>
          </div>
        </div>
      </div>

      {/* ------- Newsletter ------- */}
      <section className="container">
        <div className="subscribe">
          <div className="subscribe-container">
            <h1 className="subscribe-title">
              Get <span className="off">25%</span> Discount
            </h1>
            <p className="subscribe-text">
              Subscribe to the Martfury mailing list to receive updates on new
              arrivals, special offers and promotions.
            </p>

            <div className="search-box">
              <input
                className="search-input"
                type="text"
                placeholder="Enter Your Email"
              />
              <button className="btn search-btn">Search</button>
            </div>
          </div>

          <div className="subscribe-container">
            <img
              className="subscribe-image"
              src="./media/img/meal.jpg"
              alt="meal"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
