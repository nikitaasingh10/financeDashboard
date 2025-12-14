import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const savedExpenses = localStorage.getItem(key);

        if (savedExpenses) {
            setValue(JSON.parse(savedExpenses));
        }
    }, []);

    const setItem = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setItem];
};

export default useLocalStorage;