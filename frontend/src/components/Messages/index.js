import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const error = () => {
  toast.error("O usuário que tentou ser cadastrado já existe!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true
  });
};

export const success = () => {
  toast.success("Usuário cadastrado com sucesso!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true
  });
};
