import React, { useState } from 'react';

import Todolist, { TaskType } from './components/todolist/Todolist'

import logo from './logoPng.png';
import './App.css';

export type FilterValueType = "all" | "completed" | "active"

function App() {

  // let initTasks = [
  //   {id: 1, title: "JavaScript", isDone: true},
  //   {id: 2, title: "React", isDone: true},
  //   {id: 3, title: "Next.js", isDone: false},
  // ]

  // let tasks2 = [
  //   {id: 1, title: "Властелин колец", isDone: true},
  //   {id: 2, title: "Ходячие мертвецы", isDone: true},
  //   {id: 3, title: "Битва за Амазонку", isDone: false},
  // ]

  // let tasks3 = [
  //   {id: 1, title: "Приготовить кушать", isDone: true},
  //   {id: 2, title: "Сходить в зал", isDone: true},
  //   {id: 3, title: "Покодить", isDone: false},
  //   {id: 4, title: "Прогуляться", isDone: false},
  // ]

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "JavaScript", isDone: true},
    {id: 2, title: "React", isDone: true},
    {id: 3, title: "Next.js", isDone: false},
  ]);

  let [filter, setFilter] = useState<FilterValueType>("all");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter( t => t.id !== id)
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  } 
  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='header_logo'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <h1>
          TaskFlow 
        </h1>
      </header>

      <section>
        <div className="main">
          <Todolist 
            title="Що вивчити?" 
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
          />
          {/* <Todolist 
            title="Який фільм/серіал подивитись?"
            tasks={tasks2}
            removeTask={removeTask}
          />
          <Todolist 
            title="Що зробити за день?"
            tasks={tasks3}
            removeTask={removeTask}
          /> */}
        </div>
      </section>
      
      <footer>
        <p>by alexiusmur</p>
      </footer>
    </div>
  );
}

export default App;
