import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

type AddItemFormPropsType = {
   addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
   let [newTaskTitle, setNewTaskTitle] = useState('');
   let [error, setError] = useState<string | null>(null);

   const addTask = () => {
      if (newTaskTitle.trim() !== '' && newTaskTitle.length < 10) {
         props.addItem(newTaskTitle);
         setNewTaskTitle('');
      } else {
         setError('Filed is required');
      }
   };

   const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value);
   };

   const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.ctrlKey === true && e.code === 'Enter') {
         props.addItem(newTaskTitle);
         setNewTaskTitle('');
      }
   };
   return (
      <div>
         <TextField
            variant={'outlined'}
            label={'Type value'}
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyUp={onKeyUpHandler}
            error={!!error}
            helperText={error}
         />
         <IconButton color={'primary'} onClick={addTask}>
            <ControlPoint />
         </IconButton>
      </div>
   );
}
