import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';


export const TodoContext = createContext();

export const TodoProvider = props => {

    const [todos, setTodos] = useState([]);
    const [updateToggle, setUpdateToggle] = useState(false);

    const updateContext = () => {
        setUpdateToggle(!updateToggle);
    }

    useEffect(() => {
        fetchData();
    }, [updateToggle])

    const fetchData = () => {
        axios
            .get('/api/tasks')
            .then(raw => {
                setTodos(raw.data.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <TodoContext.Provider value={[todos, updateContext]}>
            {props.children}
        </TodoContext.Provider>
    );
}