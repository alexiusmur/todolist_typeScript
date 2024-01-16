import React, { useState, KeyboardEvent, ChangeEvent  } from 'react'
import { FilterValueType } from '../../App'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}

export default function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPresshandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
          props.addTask(newTaskTitle);
          setNewTaskTitle("");
        }
      };

    //   const onKeyPresshandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //       props.addTask(newTaskTitle);
    //       setNewTaskTitle("");
    //     }
    //   };

      const addTask = () => {
        // if ( newTaskTitle.trim() !== "" && newTaskTitle !== "lox") {
        //     props.addTask(newTaskTitle.trim());
        //     setNewTaskTitle("");
        // }
        if ( newTaskTitle.trim() !== "" ) {
            props.addTask(newTaskTitle.trim());
        setNewTaskTitle("");
        }
        else {
            setError("Title is required");
        }
        
      }

      const onAllClickHandler = () => props.changeFilter("all");
      const onActiveClickHandler = () =>  props.changeFilter("active");
      const onComplitedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
        <h3>{props.title}</h3>
        <div>
            <input type="text" value={newTaskTitle} 
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPresshandler}
            className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
        {
        props.tasks.map( t => {
            const onRemoveHandler = () => {
               props.removeTask(t.id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked);
            }
        
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox" 
                    onChange={onChangeHandler}
                    checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>X</button>
            </li>
        })}
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} 
                onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} 
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} 
                onClick={onComplitedClickHandler}>Completed</button>
        </div>
    </div>
  )
}
