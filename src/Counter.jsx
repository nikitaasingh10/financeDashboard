import { useReducer } from "react";

const counterReducer = (state, action) => {
    switch(action.type) {
        case 'Increment':
            return state + 1;
        case 'Decrement':
            return state - 1;
        case 'Reset':
            return 0;
        default:
            return state;
    }
};

const Counter = () => {
    const [count, dispatch] = useReducer(counterReducer, 0);

    return (
        <div>
            <h2>Count: {count}</h2>
            <button type="button" onClick={() => dispatch({type: 'Increment'})}>+</button>
            <button type="button" onClick={() => dispatch({type: 'Decrement'})}>-</button>
            <button type="button" onClick={() => dispatch({type: 'Reset'})}>Reset</button>
        </div>
    );
};

export default Counter;