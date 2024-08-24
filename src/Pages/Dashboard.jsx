// helper function

import { Link, useLoaderData } from "react-router-dom";
import { fetchData, createBudget, waait, createExpense, deleteItem } from "../helper"
import Intro from "../Components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";
import AddExpenceForm from "../Components/AddExpenceForm";
import BudgetItem from "../Components/BudgetItem";
import Table from "../Components/Table";


//loader function
export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  const expenses = fetchData('expenses');


  return { userName, budgets, expenses };
}

//Action
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log(_action)

  // new user submission
  if (_action === "newUser") {
    try {
      // throw new Error("Yeah Done")
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome ${values.userName}`)
    } catch (error) {
      throw new Error("Something went wrong in your account")
    }
  }

  if (_action === "CreateBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount
      })
      // throw new Error("You Faild")
      return toast.success("Budget Created!!")
    }
    catch (error) {
      throw new Error("Budget Create Problem")
    }
  }
  if (_action === "createExpense") {
    try {
      // create expense
      createExpense({
        values: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      // throw new Error("You Faild")
      return toast.success(`Expense ${values.newExpense} Created!!`)
    }
    catch (error) {
      throw new Error("Expense Create Problem")
    }
  }
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

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome Back <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {
              budgets && budgets.length > 0 ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenceForm budgets={budgets} />
                  </div>
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {
                      budgets.map((budget) => (
                        <BudgetItem key={budget.id} budget={budget} />
                      ))
                    }
                  </div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Recent Expenses</h2>
                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 6)}

                        />
                        {expenses.length > 3 && (
                            <Link
                              to="expenses"
                              className="btn btn--dark"
                            >View all expenses</Link>
                        )}
                      </div>

                    )
                  }
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal Budget is the secret to financial freedom </p>
                  <p>Create a budget to get started</p>
                  <AddBudgetForm />
                </div>
              )
            }
          </div>
        </div>

      ) : <Intro />}
    </div>
  )
}

export default Dashboard