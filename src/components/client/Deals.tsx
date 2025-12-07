import "./deals.css";

const Deals=()=>{
    return(
        <section className="box">
                <div className="container">

                    <div className="deals">

                        <div className="deals_day">
                            <div className="heading">Recipe Of The Day</div>
                            <div className="deals_box">
                                <img src="./media/img/Rabri Jalebi.png" className="deals_img" />
                                <div className="deals_text">
                                    <span className="slide_price">
                                        FRUITS
                                    </span>
                                    <h2 className="slide_heading">
                                        Rabri Jalebi
                                    </h2>
                                    <span className="slide_price">
                                        190 Rs.
                                    </span>
                                    <del>250 Rs.</del>
                                    <h4 className="slide_price">
                                        Status: In Stock</h4>
                                    <h6 className="slide_price">Expires in</h6>
                                    <span className="time">02</span>:
                                    <span className="time">09</span>:
                                    <span className="time">32</span>:
                                    <span className="time">02</span>
                                </div>
                            </div>
                        </div>
                        <div className="seller">
                            <div className="slide_day">

                                <div className="seller_slide">
                                    <div className="heading">Top 20 Best Seller
                                        <hr />
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/6.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">Homesoy Milk</h3>
                                                <span className="slide_price">390 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/4.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">MariGold</h3>
                                                <span className="slide_price">240 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/2.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">
                                                    Pineapple</h3>
                                                <span className="slide_price">130 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/1.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">Organic Oranges</h3>
                                                <span className="slide_price">420 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* <!--  --> */}

                                <div className="seller_slide">
                                    <div className="heading">Buy 1 Get 1 Free
                                        <hr />
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/3.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading"> Strawberries</h3>
                                                <span className="slide_price">390 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/5.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">Avocadoes</h3>
                                                <span className="slide_price">390 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/6.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">Australia Banana</h3>
                                                <span className="slide_price">390 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/7.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">Vita Coco</h3>
                                                <span className="slide_price">390 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* <!--  --> */}

                                <div className="seller_slide">
                                    <div className="heading">Top 20 Best Seller
                                        <hr />
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/8.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">Homesoy Milk</h3>
                                                <span className="slide_price">390 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/9.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">MariGold</h3>
                                                <span className="slide_price">240 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/10.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">
                                                    Pineapple</h3>
                                                <span className="slide_price">130 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="box1">
                                        <div className="box2">
                                            <img src="./media/img/11.png" className="slide_img" />
                                            <div className="text">
                                                <h3 className="slide_heading">Organic Oranges</h3>
                                                <span className="slide_price">420 Rs.</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </section>
    )
}

export default Deals;