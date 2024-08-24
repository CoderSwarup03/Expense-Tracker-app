export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800));


// color generat
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`;
}

// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
};

// Get all items from  localstorage
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
};


// delete Item from local stroage
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key);
}


// Create Budget
export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? []; //empty array
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))

}
// create expense
export const createExpense = ({
    name, amount, budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? []; //empty array
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

// delete Item********
// export const deleteItem = ({ key }) => {
//     return localStorage.removeItem(key)
// }


//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        // Check expence id === budgetId I Passed in 
        if(expense.budgetId !== budgetId) return acc

        // ADD the currrent amount to total
        return acc += expense.amount
    }, 0)
    return budgetSpent;
}



// Formating
export const formatDateToLocalestring = (epoch) =>
new Date(epoch).toLocaleDateString();


// Formatting Percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}




// Format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined,
        {
          style: "currency",
          currency: "USD" 
        }
    )
}
