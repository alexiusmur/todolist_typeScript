import React, { useReducer } from 'react';
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
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type FilterValueType = "all" | "completed" | "active"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: "What to learn?", filter: "all"},
    {id: todolistId2, title: "What to buy?", filter: "all"},
  ])

  const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTasksReducer(action)
    console.log(action)
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId)
    dispatchToTasksReducer(action)
    console.log(action)
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todolistId)
    dispatchToTasksReducer(action)
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId)
    dispatchToTasksReducer(action)
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    const action = ChangeTodolistFilterAC(todolistId, value);
    dispatchToTodolistsReducer(action)
  }

  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId)
    dispatchToTasksReducer(action)
    dispatchToTodolistsReducer(action)
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const action = ChangeTodolistTitleAC(todolistId, newTitle);
    dispatchToTodolistsReducer(action)
  }

  function addTodolist(title: string) {
    const action = AddTodolistAC(title)
    dispatchToTasksReducer(action)
    dispatchToTodolistsReducer(action)
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
export default AppWithReducers;