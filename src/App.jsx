import React, { useState, useEffect } from "react";
import {v4 as uuid4} from 'uuid';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios";

import "./App.css";

import Header from './Header';
import Tasks from "./Components/Tasks";
import Title from "./Components/Title";
import AddTask from "./Components/AddTask";
import TaskDetails from "./Components/TaskDetails";

//Tudo que tem "use" no inicio, são Hooks.

function App(){
    const [tasks, setTasks] = useState ([
        {
            id: '1',
            title: 'Estudar Programação',
            completed: false
        },

        {
            id: '2',
            title: 'Fazer um projeto',
            completed: true,  
        },
    ]);

    //Lembrando que o "useEffect" não é feito para retornar nada como Return.
    //Sempre que quiser fazer uma requisição dentro do "useEffect", tem que criar uma função async e chamar ela em baixo. -nome da função = fetchTasks / -chamando em baixo = fetchTasks();
    
    useEffect(() => { 
        const fetchTasks = async () => {
            const { data } = await axios.get("http://jsonplaceholder.cypress.io/todos?_limit=10")
            
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const handleTaskClick = (taskId) => {
        const newTasks = tasks.map(task => {
        if (task.id === taskId) return {...task, completed: !task.completed}

        return task;
    });
    setTasks(newTasks);
};

    const handleTaskEdition = (taskTitle) => {
        const newTasks = [...tasks, {
            title: taskTitle,
            id: Math.random(),
            completed: false,
        }];
        setTasks(newTasks);
    };

    //handleTaskDeletion = vai ser usado para apagar as tasks ao clicar no "X".
    const handleTaskDeletion = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
    };

    return (

    <Router>
        <Header />
        <div className="container">
            <Title />
            <Route path="/" exact render={() => (
            <>
                <AddTask handleTaskEdition={handleTaskEdition}/>
                <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskDeletion={handleTaskDeletion}/>
            </>
           )} 
        />
            <Route path="/:taskTitle" exact component={TaskDetails} />
        </div>
    </Router>
)};

export default App;

