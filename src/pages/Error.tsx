import { useRouteError } from "react-router-dom";
import ErrorImage from "/media/img/error.jpg";

const Error = ({ message }: { message?: string }) => {
  const error = useRouteError();
  console.log("Route Error:", error);
  return (
    <div className="error-page">
      <img
        src={ErrorImage}
        alt="Error"
        style={{ width: "300px", height: "300px" }}
      />
      <h2>Oops! Something went wrong.</h2>
      <p>{message || "The page you are looking for does not exist."}</p>
    </div>
  );
};

export default Error;
