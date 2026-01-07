import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";

import { POST_USER_LOGOUT } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchItems } from "@/redux/slice/cartSlice";
import { removeAccessToken } from "@/redux/slice/userSlice";
import { api } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { ThemeToggle } from "../theme-toggle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.userInfo);
  const cartTotalItems = useAppSelector((state) => state.cart.totalQuantity);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      try {
        const response = await api.getCartProduct(userId);
        if (response.status === "success") {
          dispatch(fetchItems(response.data?.cartItemData || []));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCartItems();
  }, [userId, dispatch]);

  const logout = async () => {
    try {
      const response = await fetch(POST_USER_LOGOUT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("persist");
        dispatch(removeAccessToken());
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Fork<span className="text-primary">ly</span>
          </Link>

          {/* Search */}
          {user?.accessToken && (
            <Input
              className="hidden md:block max-w-sm"
              placeholder="Search for pizza..."
            />
          )}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {!user?.accessToken ? (
              <Button asChild variant="default">
                <Link to="/authentication">Login / Register</Link>
              </Button>
            ) : (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative">
                  <FaShoppingCart className="text-xl" />
                  {cartTotalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 px-1 text-xs">
                      {cartTotalItems}
                    </Badge>
                  )}
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link to="/account">Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer"
                      onClick={logout}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto flex h-12 items-center justify-between px-4 text-sm">
          <Link to="/restaurants" className="font-semibold">
            Restaurants
          </Link>

          <div className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
          </div>

          <a href="tel:9870895374" className="font-semibold">
            Hotline: +91-9870895374
          </a>
        </div>
      </nav>

      <ToastContainer />
    </>
  );
}
