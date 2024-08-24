import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helper";
import Table from "../Components/Table";
import { toast } from "react-toastify";


export async function expensesLoader() {
  const expenses = await fetchData('expenses');
  return { expenses };
}


// Delete Expense Page Data
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);


  if (_action === "deleteExpense") {
    try {
      // create expense
      deleteItem({
        key: "expenses",
        id: values.expenseId
      })
      // throw new Error("You Faild")
      return toast.success("Expense Deleted!!")
    }
    catch (error) {
      throw new Error("Expense Delete Problem")
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <h2>Recent Expenses<small>({expenses.length}Total)</small></h2>
            <Table expenses={expenses} />
          </div>
        )
          : <p>No Expenses Show</p>
      }
    </div>
  )
}

export default ExpensesPage