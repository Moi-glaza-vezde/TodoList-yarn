import { ChangeEvent, KeyboardEvent, MouseEventHandler, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
   id: string;
   title: string;
   isDone: boolean;
};

type TodoListPropsType = {
   title: string;
   tasks: Array<TaskType>;
   removeTask: (id: string) => void;
   changeFilter: (value: FilterValuesType) => void;
   addTask: (title: string) => void;
   changeStatus: (taskId: string, isDone: boolean) => void;
   filter: string;
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
         props.addTask(newTaskTitle);
         setNewTaskTitle('');
      }
   };

   const addTask = () => {
      if (newTaskTitle.trim() !== '' && newTaskTitle.length < 10) {
         props.addTask(newTaskTitle);
         setNewTaskTitle('');
      } else {
         setError('Fild is required');
      }
      // if () {
      //    return;
      // }
   };

   const onAllClickHandler = () => props.changeFilter('all');
   const onActiveClickHandler = () => props.changeFilter('active');
   const onAllCompletedHandler = () => props.changeFilter('completed');

   return (
      <div>
         <h3>{props.title}</h3>
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
                  props.removeTask(t.id);
               };
               const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  console.log(t.id, e.currentTarget.checked);

                  props.changeStatus(t.id, e.currentTarget.checked);
               };

               return (
                  <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                     <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler} />
                     <span>{t.title}</span> <button onClick={onRemoveHandler}>x</button>
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
