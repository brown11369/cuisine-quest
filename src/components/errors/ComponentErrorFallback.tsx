import ErrorImage from "/media/img/error.jpg";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error | null;
  onRetry: () => void;
};

const ComponentErrorFallback: React.FC<Props> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10 text-center">
      <img
        src={ErrorImage}
        alt="Error"
        className="w-64 h-64 md:w-80 md:h-80 object-contain mb-6"
      />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Something went wrong.
      </h2>
      <p className="text-gray-600 mb-6">
        {error?.message ?? "Something unexpected happened."}
      </p>
      <Button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
      >
        Retry
      </Button>
    </div>
  );
};

export default ComponentErrorFallback;
