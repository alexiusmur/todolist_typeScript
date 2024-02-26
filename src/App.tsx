import React, { useState } from 'react';
import {v1} from 'uuid';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Todolist, { TaskType } from './components/todolist/Todolist';
import {AddItemForm} from './components/AddItemForm';

// import logo from './logoPng.png';
import './App.css';
import { Container, Grid, Paper } from '@mui/material';

export type FilterValueType = "all" | "completed" | "active"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskFlow
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={ {padding:'15px'} }>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          {
            todolists.map( (tl) => {
              let tasksForTodoList = tasksObj[tl.id];
                if (tl.filter === "completed") {
                  tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                } 
                if (tl.filter === "active") {
                  tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                }

              return <Grid item>
                <Paper style={ {padding:'10px'} }>
                  <Todolist
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
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}  

export default App;