import { toast } from "react-hot-toast";

interface ToastProps {
  type: "success" | "error" | "loading";
  message: string;
  id?: string; // Optional id to prevent duplication
}

export const showToast = ({ type, message, id }: ToastProps) => {
  const toastTypes: {
    [key in ToastProps["type"]]: (
      msg: string,
      options?: { id: string },
    ) => void;
  } = {
    success: (msg, options) => toast.success(msg, options),
    error: (msg, options) => toast.error(msg, options),
    loading: (msg, options) => toast.loading(msg, options),
  };

  toastTypes[type](message, id ? { id } : undefined);
};
