import React, { useState, KeyboardEvent, ChangeEvent  } from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FilterValueType } from '../../App';
import AddItemForm from '../AddItemForm';
import EditableSpan from '../editableSpan/EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string,  todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string,  todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,  todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string,  todolistId: string) => void
    filter: FilterValueType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (todolistId: string, newTitle: string) => void;
}

export default function Todolist(props: PropsType) {

    //   const onKeyPresshandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //     //   props.addTask(title);
    //       setTitle("");
    //     }
    //   };

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () =>  props.changeFilter("active", props.id);
    const onComplitedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => {props.removeTodolist(props.id)};
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

  return (
    <div>
        <h3>
            <EditableSpan  
                title={props.title} 
                onChange={changeTodolistTitle}
            />
            <IconButton onClick={removeTodolist} aria-label="delete" size="medium">
                <DeleteIcon fontSize="medium"/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
        {
        props.tasks.map( t => {
            const onRemoveHandler = () => {
               props.removeTask(t.id, props.id)
            }
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newIsDoneValue = e.currentTarget.checked;
                props.changeTaskStatus(t.id, newIsDoneValue, props.id);
            }

            const onChangeTitleHandler = (newValue: string) => {
                props.changeTaskTitle(t.id, newValue, props.id);
            }
        
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox 
                    color={"success"}
                    onChange={onChangeStatusHandler}
                    checked={t.isDone} 
                /> 
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={onRemoveHandler} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </li>
        })}
        </ul>
        <div>
            <Button color={'inherit'} variant={props.filter === "all" ? "contained" : "text"} 
                onClick={onAllClickHandler}>All</Button>
            <Button color={'primary'} variant={props.filter === "active" ? "contained" : "text"} 
                onClick={onActiveClickHandler}>Active</Button>
            <Button color={'secondary'} variant={props.filter === "completed" ? "contained" : "text"} 
                onClick={onComplitedClickHandler}>Completed</Button>
        </div>
    </div>
  )
}
