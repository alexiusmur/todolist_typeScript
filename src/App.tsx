import React, { useState } from 'react';

import Todolist, { TaskType } from './components/todolist/Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';

import logo from './logoPng.png';
import './App.css';

export type FilterValueType = "all" | "completed" | "active"
type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksStateType = {
   [key: string]: Array<TaskType>

}

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

  // let [tasks, setTasks] = useState<Array<TaskType>>([
  //   {id: v1(), title: "JavaScript", isDone: true},
  //   {id: v1(), title: "React", isDone: true},
  //   {id: v1(), title: "Next.js", isDone: false},
  //   {id: v1(), title: "REST API", isDone: false},
  //   {id: v1(), title: "GraphQL", isDone: false},
  // ]);

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter( t => t.id !== id)
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let task = {
      id: v1(), 
      title: title, 
      isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    //достает нужный массив с todolistId
    let todolistTasks = tasksObj[todolistId];
    //находит нужную таску
    let task = todolistTasks.find( t => t.id === taskId);
    //изменит таску, если она нашлась
    if (task) {
      task.isDone = isDone;
      //засетает в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasksObj});
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    //достает нужный массив с todolistId
    let todolistTasks = tasksObj[todolistId];
    //находит нужную таску
    let task = todolistTasks.find( t => t.id === taskId);
    //изменит таску, если она нашлась
    if (task) {
      task.title = newTitle;
      //засетает в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasksObj});
    }
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    const todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn?", filter: "all"},
    {id: todolistId2, title: "What to buy?", filter: "all"},
  ])

  const removeTodolist = (todolistId: string) => {
    const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
    
    delete tasksObj[todolistId];
    setTasks({...tasksObj});
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === todolistId);
    if(todolist){
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  const [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "JavaScript", isDone: true},
      {id: v1(), title: "React", isDone: true},
      {id: v1(), title: "Next.js", isDone: false},
      {id: v1(), title: "REST API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "Bookstory", isDone: true},
      {id: v1(), title: "React", isDone: true},
      {id: v1(), title: "Next.js", isDone: false},
      {id: v1(), title: "REST API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
  });

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(), 
      title: title, 
      filter: "all"};
    setTodolists([todolist, ...todolists]);
    setTasks({...tasksObj, [todolist.id]: []})
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
          <AddItemForm addItem={addTodolist} />
          {
            todolists.map( (tl) => {
              let tasksForTodoList = tasksObj[tl.id];
                if (tl.filter === "completed") {
                  tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                } 
                if (tl.filter === "active") {
                  tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                }

              return <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title} 
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                changeTaskTitle={changeTaskTitle}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeTodolistTitle}
              />
            })
          }
        </div>
      </section>
    </div>
  );
}

export default App;
