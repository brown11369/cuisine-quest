import { isAxiosError } from "axios";
import { toast } from "react-toastify";

// const isAxiosError = (err: unknown): err is AxiosError<{ message: string }> => {
//   return err instanceof Error && "isAxiosError" in err;
// };

export const handleError = (
  error: unknown,
  fallbackMessage = "Something went wrong",
) => {
  console.error("Error:", error);

  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (message) {
      toast(message);
      return;
    }
  }

  if (error instanceof Error) {
    toast(error.message);
    return;
  }

  toast(fallbackMessage);
};
