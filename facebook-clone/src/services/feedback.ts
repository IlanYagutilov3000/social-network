import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function succesMsg(msg: string) {
    toast.success(msg, {
        position: "bottom-left",
        autoClose: 1250,
        theme: "dark"
    })
}

export function ErrorMsg(msg: string) {
    toast.error(msg, {
        position: "bottom-left",
        autoClose: 1250,
        theme: "dark"
    })
}