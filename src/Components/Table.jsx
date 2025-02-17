import ExpenseItem from "./ExpenseItem"


const Table = ({ expenses }) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date","Budget",""].map((i, index) =>(
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense) =>(
                            <tr key={expense.id}>
                                {/* {expense.name} */}
                                <ExpenseItem expense={expense}/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* Table */}
            {/* bdhkbvhskb */}
            {/* jhvhjdshv */}
        </div>
    )
}

export default Table