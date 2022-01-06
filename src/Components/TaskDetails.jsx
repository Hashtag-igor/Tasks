import React from "react";
import { useHistory, useParams } from "react-router-dom";

import "./TaskDetails.css";

import Button from "./Button";


const TaskDetails = () => {
    const params = useParams(); //Retorna os parametros que estão sendo utilizados na URL
    const history = useHistory();

    const handleBackButtonClick = () => {
        history.goBack();
    }

    return (
        <>
            <div className="back-button-container">
                <Button onClick={handleBackButtonClick}>Voltar</Button>
            </div>
            <div className="task-details-container">
                <h2>{params.taskTitle}</h2>
                <p>Escreva uma descrição da tarefa..</p>
            </div>
        </>
    )
}

export default TaskDetails;