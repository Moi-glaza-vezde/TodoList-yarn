import {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void;

}

export function AddItemForm(props: AddItemFormPropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);


    const addTask = () => {
        if (newTaskTitle.trim() !== '' && newTaskTitle.length < 10) {
            props.addItem(newTaskTitle, );
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
            props.addItem(newTaskTitle, );
            setNewTaskTitle('');
        }
    };
    return (

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
    )
}