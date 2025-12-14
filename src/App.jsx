import React from "react";
import {useState, useReducer} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Card from "./Card"


const App = () => {
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");

    // using custom hook useLocalStorage instead of useState
    // const [expenseList, setExpenseList] = useState([]);
    const [expenseList, setExpenseList] = useLocalStorage('expenses', []);

    const totalExpenses = expenseList.reduce((total, expense) => total + expense.amount, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseObj = {item: expenseDescription, amount: Number.parseInt(expenseAmount)};
        setExpenseList([...expenseList, expenseObj]);
        setExpenseAmount("");
        setExpenseDescription("");
    }

    return (
        <form onSubmit={handleSubmit}>
            
                <input 
                    value={expenseDescription}
                    placeholder="Enter expense description"
                    onChange={(e) => setExpenseDescription(e.target.value)}
                />
                <input
                    placeholder="Enter expense amount"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(Number.parseInt(e.target.value))}
                />
                <button type="submit">submit</button>

                {expenseList.map((li, index) => 
                    <Card className="card" key={index} title={li.item}>
                        <p>${li.amount}</p>
                    </Card>
                )}
                
            <h2>total: {totalExpenses}</h2>

        </form>
    );
};

export default App;