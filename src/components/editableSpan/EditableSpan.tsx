import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string) => void
}

export default function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")
    
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
    ? 
    <TextField 
        id="outlined-basic" 
        variant="standard"  
        value={title} 
        onChange={onChangeTitleHandler} 
        onBlur={activateViewMode} 
        autoFocus 
    />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}
