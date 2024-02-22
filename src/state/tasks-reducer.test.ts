import { 
    tasksReducer, 
    removeTaskAC, 
    addTaskAC, 
    changeTaskStatusAC, 
    changeTaskTitleAC,
} from "./tasks-reducer";
import { TasksStateType } from "../App";
import { AddTodolistAC, RemoveTodolistAC } from "./todolists-reducer";

test('correct tast should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: false },
            { id: "3", title: "Next.js", isDone: false },
        ],
    };

    const action = removeTaskAC("2", "todolistId2")

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    //expect(endState["todolistId2"][0].id).toBe("1");
    //expect(endState["todolistId2"][1].id).toBe("3");
});

test('correct tast should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: false },
            { id: "3", title: "Next.js", isDone: false },
        ],
    };

    const action = addTaskAC("asios", "todolistId2")

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("asios");
    expect(endState["todolistId2"][1].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
    };

    const action = changeTaskStatusAC("2", false, "todolistId2")

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].isDone).toBeFalsy();
    expect(endState["todolistId1"][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
    };

    const action = changeTaskTitleAC("2", "Arrow", "todolistId2")

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].title).toBe("Arrow");
    expect(endState["todolistId1"][1].isDone).toBe("React");
});

test('new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
    };

    const action = AddTodolistAC("title no matter")

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if(!newKey){
        throw new Error("new key should be added");
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolist should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
        "todolistId2": [
            { id: "1", title: "JavaScript", isDone: true },
            { id: "2", title: "React", isDone: true },
            { id: "3", title: "Next.js", isDone: false },
        ],
    };

    const action = RemoveTodolistAC("todolistId2")

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeUndefined();
});