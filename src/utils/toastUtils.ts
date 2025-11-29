import { toast, ToastOptions } from "react-toastify";

// Common configuration for all toasts
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const showSuccessToast = (message: string): void => {
  toast.dismiss();
  toast.success(message || "Successful!", defaultOptions);
};

export const showErrorToast = (message: string): void => {
  toast.error(message || "Something went wrong!", defaultOptions);
};

export const showInfoToast = (message: string): void => {
  toast.info(message || "Information message", defaultOptions);
};

export const showWarningToast = (message: string): void => {
  toast.warn(message || "Warning message", defaultOptions);
};
