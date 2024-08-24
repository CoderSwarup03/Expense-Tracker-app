import { calculateSpentByBudget, formatCurrency, formatPercentage, } from "../helper";

const BudgetItem = ({ budget }) => {
    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);
    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Bugeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} Spent</small>
                <small>{formatCurrency(amount - spent)} Remaining</small>
            </div>
        </div>
    )
}

export default BudgetItem
