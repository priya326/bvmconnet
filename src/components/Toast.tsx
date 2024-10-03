import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastOptions = {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: "light" | "dark";
  transition?: any;
};

const CustomToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
};

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string,
  options?: ToastOptions
) => {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: Bounce,
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "info":
      toast.info(message, defaultOptions);
      break;
    case "warning":
      toast.warning(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
  }
};

export default CustomToast;
