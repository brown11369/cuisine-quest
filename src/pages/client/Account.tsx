import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";

const Account = () => {
  const user = useAppSelector((store) => store.user.userInfo);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* User Image */}
        <div className="md:w-1/3 flex justify-center items-center bg-gray-50 p-6">
          <img
            src="../media/img/user-profile.png"
            alt="User Profile"
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-gray-200"
          />
        </div>

        {/* User Details */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.name}
            </h2>
            <p className="mt-2 text-gray-600">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            {user?.contact && (
              <p className="mt-1 text-gray-600">
                <span className="font-medium">Phone:</span> {user.contact}
              </p>
            )}
            {user?.address && (
              <p className="mt-1 text-gray-600">
                <span className="font-medium">Address:</span> {user.address}
              </p>
            )}
            {user?.shippingAddress && (
              <p className="mt-1 text-gray-600">
                <span className="font-medium">Shipping:</span>{" "}
                {user.shippingAddress}
              </p>
            )}
          </div>

          <div className="mt-6 md:mt-auto">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
              Edit Information
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
