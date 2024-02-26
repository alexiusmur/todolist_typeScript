import React, { useCallback, useReducer } from 'react';
import {v1} from 'uuid';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Todolist, { TaskType } from './components/todolist/Todolist';
import { AddItemForm } from './components/AddItemForm';

// import logo from './logoPng.png';
import './App.css';
import { Container, Grid, Paper } from '@mui/material';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type FilterValueType = "all" | "completed" | "active"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>( state => state.todolists )
  const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks )

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatch(action)
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId)
    dispatch(action)
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId)
    dispatch(action)
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(id, newTitle, todolistId)
    dispatch(action)
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    const action = ChangeTodolistFilterAC(todolistId, value);
    dispatch(action)
  }

  const removeTodolist = (id: string) => {
    const action = RemoveTodolistAC(id)
    dispatch(action)
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const action = ChangeTodolistTitleAC(id, newTitle);
    dispatch(action)
  }

  const addTodolist = useCallback((title: string) => {
    const action = AddTodolistAC(title);
    dispatch(action)
  }, []);

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
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;
                if (tl.filter === "completed") {
                  tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                } 
                if (tl.filter === "active") {
                  tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                }

              return <Grid item key={tl.id}>
                <Paper style={ {padding:'10px'} }>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title} 
                    tasks={tasksForTodolist}
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
export default AppWithRedux;