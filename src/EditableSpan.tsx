import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
   title: string;
   onChange: (value: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
   let [editMode, setEditMode] = useState(false);
   let [title, setTitle] = useState('');
   const activeEditMode = () => {
      setEditMode(true);
      setTitle(props.title);
   };
   const activeViewMode = () => {
      setEditMode(false);
      props.onChange(title);
   };
   const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   };
   return (
      <>
         {editMode ? (
            <TextField
               value={title}
               onChange={onChangeTitleHandler}
               onBlur={activeViewMode}
               autoFocus={true}
            />
         ) : (
            <span onDoubleClick={activeEditMode}>{props.title}</span>
         )}
      </>
   );
}
