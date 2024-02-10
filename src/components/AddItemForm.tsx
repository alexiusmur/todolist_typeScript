import React, { useState, KeyboardEvent, ChangeEvent  } from 'react'
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export default function AddItemForm(props : AddItemFormPropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPresshandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask();
        }
    };

    const addTask = () => {
      // if ( title.trim() !== "" && title !== "lox") {
      //     props.addTask(title.trim());
      //     setTitle("");
      // }
      if ( title.trim() !== "" ) {
        props.addItem(title.trim());
        setTitle("");
      }
      else {
        setError("Title is required");
      }  
    }
      
    return <div>
      <TextField 
        id="outlined-basic" 
        label="Write title task" 
        variant="outlined" 
        value={title} 
        onChange={onChangeHandler}
        onKeyPress={onKeyPresshandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={'primary'}>
        <AddTaskIcon />
      </IconButton>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
}