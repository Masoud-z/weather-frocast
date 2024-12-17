import { AxiosError } from "axios";
import { toast } from "react-toastify";

const errorHandler = (error: AxiosError, handleError?: boolean) => {
  if (!process.browser) return;
  if (!error || !error?.response) return;

  if (handleError) {
    toast.error(`${error.code}: ${error.message}`);
  }
};

export default errorHandler;
