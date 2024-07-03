import "./footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="container footer">
            <div className="container-center align-card">
                <div className="footer-card">
                    <h5 className="footer-title">Quick Links<hr /></h5>
                    <ul className="quick_links">
                        <li className="quick_link"><Link className="quick_tag" to="/">Home</Link></li>
                        <li className="quick_link"><Link className="quick_tag" to="/shop">Shop</Link></li>
                        <li className="quick_link"><Link className="quick_tag" to="/contact">Contact</Link></li>
                        <li className="quick_link"><Link className="quick_tag" to="/cart">Cart</Link></li>
                        <li className="quick_link"><Link className="quick_tag" to="/restaurant-sign">Vendor</Link></li>
                    </ul>
                </div>

                <div className="footer-card">
                    <h5 className="footer-title">Contact Info<hr /></h5>
                    <ul className="quick_links">
                        <li className="quick_link">Shop 442 Block-F Connaught Place Delhi</li>
                        <li className="quick_link">Info@brownshop.com</li>
                        <li className="quick_link">+91 9080706050</li>
                    </ul>
                </div>

                <div className="footer-card">
                    <h5 className="footer-title">Recent Blogs<hr /></h5>
                    <ul className="quick_links blogs">
                        <li className="quick_link">The Future of Sustainable E-Commerce is Now</li>
                        <li className="quick_link">The Big Billion Days 2021 – News Updates</li>
                        <li className="quick_link">Sky’s the limit: For this former IAF officer, Flipkart is an adrenaline rush!
                        </li>
                        <li className="quick_link">Enabling growth across the ecosystem</li>
                    </ul>
                </div>

                <div className="footer-card">
                    <h5 className="footer-title">Connect with Us<hr /></h5>
                    <div className="social">
                        <img className="icon" src="./media/img/facebook.png" />
                        <img className="icon" src="./media/img/instagram.png" />
                        <img className="icon" src="./media/img/pinterest.png" />
                        <img className="icon" src="./media/img/twitter.png" />
                        <img className="icon" src="./media/img/youtube.png" />
                    </div>
                    <div className="app">
                        <img className="icon1" src="./media/img/play_store.png" />
                        <img className="icon1" src="./media/img/app_store.png" />
                    </div>
                </div>
            </div>
            <div className="copyright">
                &copy; Copyright 2012 | All Rights Reserved <img className="pay" src="./media/img/payment.svg" />
            </div>
        </footer>
    )
}