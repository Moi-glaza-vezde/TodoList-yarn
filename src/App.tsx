import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, TodoList} from './TdoList';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

type TasksStateType = {
    [key: string]: TaskType[];

}

function App() {


    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let filteredTasks = tasks.filter((t) => id !== t.id);
        tasksObj[todoListId] = filteredTasks;

        setTasks({...tasksObj});
    }

    function addTask(titleValue: string, todoListId: string) {
        let task = {id: v1(), title: titleValue, isDone: false};

        let tasks = tasksObj[todoListId];

        let newTasks = [task, ...tasks];

        tasksObj[todoListId] = newTasks;

        setTasks({...tasksObj});


    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;

            setTasks({...tasksObj});
        }
    }

    function changeTaskTitle(taskId: string, newTilte: string, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.title = newTilte;

            setTasks({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let filterList = todoLists.find((tl) => tl.id === todoListId);

        if (filterList) {
            filterList.filter = value;

            setTodoList([...todoLists]);
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]);

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);

        setTodoList(filteredTodoList);

        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    };

    function changeTodolistTitle(id: string, newTitle: string) {

        setTodoList(todoLists.map((tl) => tl.id === id ?{...tl,title:newTitle} : tl))

    }


    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Chocolate', isDone: false},
            {id: v1(), title: 'Tomato', isDone: false},
        ],
    });

    function addTodoList(title: string) {

        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTasks({...tasksObj, [todoList.id]: []});

        setTodoList([todoList, ...todoLists])
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>


            {todoLists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];

                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
                }
                return (
                    <TodoList
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}

                    />
                );
            })}

        </div>
    );
}

export default App;
