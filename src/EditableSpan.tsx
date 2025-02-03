import {useState} from 'react';

type EditableSpanPropsType = {

    title: string,
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [ editMode, setEditMode ] = useState(false);
    return (
        <span> {props.title}</span>
    )

}