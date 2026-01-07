import { useState, type FormEvent, type ChangeEvent } from "react";
import { BiSolidHide, BiShowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { setUser } from "@/redux/slice/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { api } from "@/services/api";
import { handleError } from "@/utils/handleError";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { saveStore } from "@/utils/storage";

const UserAuth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    contact: "",
    shippingAddress: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const regiInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.login(userInput);
      if (res.data?.credential) {
        const { accessToken: _, ...userInfoWithoutToken } = res.data.credential;
        dispatch(setUser(res.data.credential));
        saveStore("user", userInfoWithoutToken);
        localStorage.setItem("persist", JSON.stringify(true));
        navigate("/");
      } else {
        toast("Login failed: missing credential");
      }
    } catch (err) {
      handleError(err, "Failed to login");
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.register(registerData);
      if (res.status === "success") {
        toast.success("You are registered!");
      } else {
        toast(res.message || "Registration failed");
      }
    } catch (err) {
      handleError(err, "Failed to register");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Welcome to Forkly
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={userInput.email}
                    onChange={inputHandler}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={userInput.password}
                      onChange={inputHandler}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={registerData.name}
                    onChange={regiInputHandler}
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={regiInputHandler}
                    required
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    name="contact"
                    value={registerData.contact}
                    onChange={regiInputHandler}
                    required
                  />
                </div>

                <div>
                  <Label>Shipping Address</Label>
                  <Input
                    name="shippingAddress"
                    value={registerData.shippingAddress}
                    onChange={regiInputHandler}
                    required
                  />
                </div>

                <Separator />

                <div>
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={regiInputHandler}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ToastContainer />
    </section>
  );
};

export default UserAuth;
