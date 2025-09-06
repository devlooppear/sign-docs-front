import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const flashMessage = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaultOptions, ...options }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaultOptions, ...options }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { ...defaultOptions, ...options }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...defaultOptions, ...options }),

  default: (message: string, options?: ToastOptions) =>
    toast(message, { ...defaultOptions, ...options }),
};
