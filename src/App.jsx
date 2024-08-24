import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Router Import
import Dashboard from "./Pages/Dashboard";
import { dashboardLoader, dashboardAction } from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Main, { mainLoader } from "./Layout/Main";
import { logoutAction } from "./Actions/Logout";
import ExpensesPage, { expensesAction, expensesLoader } from "./Pages/ExpensesPage";

// Action Import
// import { logoutAction } from "./Actions/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ]
  },
]);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
