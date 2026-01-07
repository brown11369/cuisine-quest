import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
            Quick Links
          </h5>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-green-600 transition-colors" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-green-600 transition-colors"
                to="/shop"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-green-600 transition-colors"
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-green-600 transition-colors"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-green-600 transition-colors"
                to="/admin/authentication"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-green-600 transition-colors"
                to="/restaurant/authentication"
              >
                Restaurant
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
            Contact Info
          </h5>
          <ul className="space-y-2">
            <li>Shop 442 Block-F, Connaught Place, Delhi</li>
            <li>Info@brownshop.com</li>
            <li>+91 9080706050</li>
          </ul>
        </div>

        {/* Recent Blogs */}
        <div>
          <h5 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
            Recent Blogs
          </h5>
          <ul className="list-disc list-inside space-y-1">
            <li>The Future of Sustainable E-Commerce is Now</li>
            <li>The Big Billion Days 2021 – News Updates</li>
            <li>
              Sky’s the limit: For this former IAF officer, Flipkart is an
              adrenaline rush!
            </li>
            <li>Enabling growth across the ecosystem</li>
          </ul>
        </div>

        {/* Social & Apps */}
        <div>
          <h5 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">
            Connect with Us
          </h5>
          <div className="flex space-x-4 mb-6">
            <img
              className="w-8 h-8 cursor-pointer"
              src="./media/img/facebook.png"
            />
            <img
              className="w-8 h-8 cursor-pointer"
              src="./media/img/instagram.png"
            />
            <img
              className="w-8 h-8 cursor-pointer"
              src="./media/img/pinterest.png"
            />
            <img
              className="w-8 h-8 cursor-pointer"
              src="./media/img/twitter.png"
            />
            <img
              className="w-8 h-8 cursor-pointer"
              src="./media/img/youtube.png"
            />
          </div>
          <div className="flex space-x-3">
            <img
              className="w-24 cursor-pointer"
              src="./media/img/play_store.png"
            />
            <img
              className="w-24 cursor-pointer"
              src="./media/img/app_store.png"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-200 text-gray-600 text-center py-4 border-t border-gray-300">
        &copy; 2012 | All Rights Reserved
        <img
          className="inline-block ml-2 max-w-96"
          src="./media/img/payment.svg"
        />
      </div>
    </footer>
  );
}
