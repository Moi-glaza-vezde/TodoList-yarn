import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

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
   let [newTaskTitle, setNewTaskTitle] = useState('');
   let [error, setError] = useState<string | null>(null);
   const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value);
   };

   const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.ctrlKey === true && e.code === 'Enter') {
         props.addTask(newTaskTitle, props.id);
         setNewTaskTitle('');
      }
   };

   const addTask = () => {
      if (newTaskTitle.trim() !== '' && newTaskTitle.length < 10) {
         props.addTask(newTaskTitle, props.id);
         setNewTaskTitle('');
      } else {
         setError('Fild is required');
      }
      // if () {
      //    return;
      // }
   };

   const onAllClickHandler = () => props.changeFilter('all', props.id);
   const onActiveClickHandler = () => props.changeFilter('active', props.id);
   const onAllCompletedHandler = () => props.changeFilter('completed', props.id);
   const removeTodoLost = () => {
      props.removeTodoList(props.id);
   };
   return (
      <div>
         <h3> {props.title}</h3> <button onClick={removeTodoLost}>X</button>
         <div>
            <input
               value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyUp={onKeyUpHandler}
               className={error ? 'error' : ''}
            />

            <button onClick={addTask}>+</button>
            {error && <div className="error-massage ">{error}</div>}
         </div>
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
                     <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler} />
                     <span>{t.title}</span>
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
