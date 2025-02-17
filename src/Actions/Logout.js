import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";
export async function logoutAction(){
    // Delete the User
    deleteItem({
        key: "userName"
    })
    deleteItem({
        key: "budgets"
    })
    deleteItem({
        key: "expenses"
    })
    toast.success("You've deleted your account")
    // Return redirect
    return redirect("/")
}