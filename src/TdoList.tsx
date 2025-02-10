import { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

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

   changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
   changeTodolistTitle: (id: string, newTitle: string) => void;
};

export function TodoList(props: TodoListPropsType) {
   const onAllClickHandler = () => props.changeFilter('all', props.id);
   const onActiveClickHandler = () => props.changeFilter('active', props.id);
   const onAllCompletedHandler = () => props.changeFilter('completed', props.id);
   const removeTodoLost = () => {
      props.removeTodoList(props.id);
   };
   const addTask = (title: string) => {
      props.addTask(title, props.id);
   };

   const changeTodolistTitle = (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
   };

   return (
      <div>
         <EditableSpan title={props.title} onChange={changeTodolistTitle} />

         {/*<button onClick={removeTodoLost}>X</button>*/}
         <IconButton onClick={removeTodoLost} aria-label="delete">
            <Delete />
         </IconButton>

         <AddItemForm addItem={addTask} />

         <ul>
            {!props.tasks.length && 'the list is empty'}
            {props.tasks.map((t) => {
               const onRemoveHandler = () => {
                  props.removeTask(t.id, props.id);
               };
               const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  props.changeStatus(t.id, e.currentTarget.checked, props.id);
               };

               const onChangeTitleHandler = (newValue: string) => {
                  props.changeTaskTitle(t.id, newValue, props.id);
               };
               return (
                  <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                     <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} />
                     <EditableSpan title={t.title} onChange={onChangeTitleHandler} />

                     <IconButton onClick={onRemoveHandler} aria-label="delete">
                        <Delete />
                     </IconButton>
                  </li>
               );
            })}
         </ul>
         <div>
            <Button
               color={'success'}
               variant={props.filter === 'all' ? 'contained' : 'text'}
               onClick={onAllClickHandler}>
               All
            </Button>
            <Button
               color={'primary'}
               variant={props.filter === 'active' ? 'contained' : 'text'}
               onClick={onActiveClickHandler}>
               Active
            </Button>
            <Button
               color={'secondary'}
               variant={props.filter === 'completed' ? 'contained' : 'text'}
               onClick={onAllCompletedHandler}>
               Completed
            </Button>
         </div>
      </div>
   );
}
