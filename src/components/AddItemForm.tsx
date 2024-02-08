import React, { useState, KeyboardEvent, ChangeEvent  } from 'react'

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
        <input type="text" value={title} 
        onChange={onChangeHandler}
        onKeyPress={onKeyPresshandler}
        className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}