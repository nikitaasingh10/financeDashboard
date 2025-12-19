import React from "react";
import {useState, useReducer, useEffect, useMemo, useCallback} from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Card from "./Card"
import Counter from "./Counter";
import {ErrorBoundary} from "./ErrorBoundary"
import CrashTest from "./CrashTest";

const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ExpenseAmount':
            return {...state, expenseAmount: action.payload};
        case 'ADD_ExpenseDescription':
            return {...state, expenseDescription: action.payload};
        case 'SUBMIT_Expense':
            const newExpenseObj = {
                item: state.expenseDescription,
                amount: Number.parseInt(state.expenseAmount)
            };
            return {
                ...state,
                expenseList: [...state.expenseList, newExpenseObj],
                expenseAmount: "",
                expenseDescription: ""
            }
        case 'LOAD_Expense':
            return {...state, expenseList: action.payload};
        default:
            return state;
    }
};

const App = () => {
    const [expense, dispatch] = useReducer(expenseReducer, {
        expenseAmount: "",
        expenseDescription: "",
        expenseList: []
    });

    const totalExpenses = useMemo(() => {
        return expense.expenseList.reduce((total, item) => {
            return total + item.amount;
        }, 0)
    }, [expense.expenseList]); // only recalculate when expenseList changes

    useEffect(() => {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) {
            dispatch({
                type: 'LOAD_Expense',
                payload: JSON.parse(savedExpenses)
            })
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expense.expenseList));
    }, [expense.expenseList]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({type: 'SUBMIT_Expense'});
    }, []); // No dependencies = function never changes

    return (
        <ErrorBoundary>
            <CrashTest/>
            <form onSubmit={handleSubmit}>
                
                    <input 
                        value={expense.expenseDescription}
                        placeholder="Enter expense description"
                        onChange={(e) => dispatch({
                            type: 'ADD_ExpenseDescription',
                            payload: e.target.value
                        })}
                    />
                    <input
                        placeholder="Enter expense amount"
                        value={expense.expenseAmount}
                        onChange={(e) => dispatch({
                            type: 'ADD_ExpenseAmount',
                            payload: Number.parseInt(e.target.value)
                        })}
                    />
                    <button type="submit">submit</button>

                    {expense.expenseList.map((li, index) => 
                        <Card 
                            className="card" 
                            key={index} 
                            title={li.item}
                            amount={li.amount}> {/**passing amount as prop instead of children so as to avoid re-rendering issue*/}
                                {/* <p>${li.amount}</p> */}
                        </Card>
                    )}
                    
                <h2>total: {totalExpenses}</h2>

                <Counter/>

            </form>

            {/* 
            // TODO: it doesn't works why?
            <button type="button" onClick={() => {throw new Error('Test crash')}}>
                crash test
            </button> */}
        </ErrorBoundary>
    );
};

export default App;