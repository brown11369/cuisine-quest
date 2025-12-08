import "./home.css";
import ProductCard from "@/components/client/ProductCard";
import Banner from "@/components/client/Banner";
import {
  MdDeliveryDining,
  MdAccessTimeFilled,
  MdPayments,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { useAppSelector } from "@/redux/hooks";

const Home = () => {
  const products = useAppSelector((store) => store.product.products);

  return (
    <>
      {/* <!-- ------- banner section ------- --> */}

      <Banner />

      {/* <!-- ------- free delivery section ------- --> */}
      <div className="container">
        <div className="container-center quality">
          <div className="qua-com">
            <MdDeliveryDining className="md-icon" />
            <h3 className="heading">Free Delivery</h3>
            <p className="quality_text">For all oders over Rs. 350</p>
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
      {/* <!-- ------- top categories section ------- --> */}

      <div className="container">
        <div className="container-center direction">
          <div className="heading">Top Categories Of The Month</div>
          <div className="product_container">
            <div className="product">
              <img className="product_img" src="./media/img/1.png" />
              <h3 className="product_heading">Rasgulla</h3>
            </div>

            <div className="product">
              <img className="product_img" src="./media/img/2.png" />
              <h3 className="product_heading">Lassi</h3>
            </div>

            <div className="product">
              <img className="product_img" src="./media/img/3.png" />
              <h3 className="product_heading">Malai Chaap</h3>
            </div>

            <div className="product">
              <img className="product_img" src="./media/img/4.png" />
              <h3 className="product_heading">Pizza</h3>
            </div>

            <div className="product">
              <img className="product_img" src="./media/img/5.png" />
              <h3 className="product_heading">Samosa</h3>
            </div>

            <div className="product">
              <img className="product_img" src="./media/img/6.png" />
              <h3 className="product_heading">Litti Chokha</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------food items---------------------------------- */}

      <div className="container food-container">
        <div className="container-center">
          {products?.slice(0, 8)?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>

      {/* <!-- ------- advertisement section ------- --> */}

      <div className="container advertisement">
        <div className="container-center">
          <div className="advertisement-box left">
            <h2>
              Fresh Summer With
              <br />
              Pineapple juice
            </h2>
            <span className="off">120 Rs./-</span>
            <br />
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan justo sed metus egestas, ac tempus mi sodales.</p> */}
            <button className="btn ad-btn">Shop Now</button>
          </div>
          <div className="advertisement-box right">
            <h2>
              Fresh Vegetable With
              <br />
              Healthy Body
            </h2>
            <span className="off">350 Rs./-</span>
            <br />
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan justo sed metus egestas, ac tempus mi sodales.</p> */}
            <button className="btn ad-btn">Shop Now</button>
          </div>
        </div>
      </div>

      {/* <!-- ------- Deals Of The Day ------- --> */}

      {/* <Deals /> */}

      {/* <!-- ------- new section ------- --> */}

      {/* <!-- ------- newsletter section ------- --> */}

      <section className="container">
        <div className="subscribe">
          <div className="subscribe-container">
            <h1 className="subscribe-title">
              Get <span className="off">25%</span> Discount
            </h1>
            <p className="subscribe-text">
              Subscribe to the Martfury mailing list to receive updates on new
              arrivals, special offers and our promotions.
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
