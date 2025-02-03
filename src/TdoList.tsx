import {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoListPropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    filter: string;

    removeTask: (id: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    removeTodoList: (todoListId: string) => void;
};

export function TodoList(props: TodoListPropsType) {


    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onAllCompletedHandler = () => props.changeFilter('completed', props.id);
    const removeTodoLost = () => {
        props.removeTodoList(props.id);
    };
    const addTask = (title: string) => {

        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3> {props.title}</h3>
            <button onClick={removeTodoLost}>X</button>


            <AddItemForm addItem={addTask}/>

            <ul>
                {!props.tasks.length && 'the list is empty'}
                {props.tasks.map((t) => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id);
                    };
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(t.id, e.currentTarget.checked);

                        props.changeStatus(t.id, e.currentTarget.checked, props.id);
                    };

                    return (
                        <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onAllCompletedHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
}


