import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom"

const AddExpenceForm = ({ budgets }) => {
    const fetcher = useFetcher();
    const formRef = useRef();
    const focusRef = useRef();
    const isSubmitting = fetcher.state === "submitting";


    useEffect(() => {
        if (!isSubmitting) {
            // clear focus
            formRef.current.reset();
            // reset focus
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
        <div className='form-wrapper'>
            <h2 className='h3'>Add New {" "}<span className='accent'>
                {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
            </span> {" "}
                Expence
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="e.g. Food"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="e.g. $3.45"
                            required
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">
                        Expense Category
                    </label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets
                                .sort((a, b) => a.createdAt - b.createdAt)
                                .map((budget) => {
                                    return (
                                        <option key={budget.id} value={budget.id}>{budget.name}</option>
                                    )
                                })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> : (
                            <>
                                <span>Add Expense</span>
                                <PlusCircleIcon width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenceForm