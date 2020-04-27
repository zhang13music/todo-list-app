import React, { useState, useContext } from 'react'
import { Button, Popup, List, Divider, Form } from 'semantic-ui-react'
import axios from 'axios';

import { TodoContext } from './TodoContext';

import "./TodoItem.scss";


const TodoItem = (props) => {

    const [todos, updateContext] = useContext(TodoContext);

    const todo = todos.find(element => element._id === props.id);

    const [isCompleted, setIsCompleted] = useState(todo.completed);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [titleErrorMsg, setTitleErrorMsg] = useState(false);

    const updateNewTitle = e => {
        setNewTitle(e.target.value);
    };

    const updateNewDescription = e => {
        setNewDescription(e.target.value);
    };

    const handleDelete = () => {
        axios
            .delete(`/api/tasks/${props.id}`)
            .then(updateContext)
            .catch(err => console.log(err))
    };

    const handleTick = () => {
        axios
            .patch(`/api/tasks/${props.id}`, {
                title: todo.title,
                description: todo.description,
                completed: !isCompleted
            })
            .then(res => {
                setIsCompleted(!isCompleted);
                todo.completed = !isCompleted;
                updateContext();
            })
            .catch(err => console.log(err))
    };

    const handleEdit = () => {

        axios
            .patch(`/api/tasks/${todo._id}`, {
                title: newTitle ? newTitle : todo.title,
                description: newDescription ? newDescription : todo.title,
                completed: isCompleted
            })
            .then(() => {
                updateContext();
                setTitleErrorMsg(false);
            })
            .catch(err => console.log(err))

    };

    let itemIcon;

    if (isCompleted) {
        itemIcon = <List.Icon name='check circle outline' size='large' verticalAlign='middle' onClick={handleTick} />;
    } else {
        itemIcon = <List.Icon name='circle outline' size='large' verticalAlign='middle' onClick={handleTick} />;
    }

    return (


        <List.Item>
            <List.Content>
                <div className="Row">

                    <div className="Row-Left">
                        <div className="ItemIcon">
                            {itemIcon}
                        </div>

                        <div className="ItemContent">
                            <List.Header>{todo.title}</List.Header>
                            <List.Description>{todo.description}</List.Description>
                        </div>
                    </div>

                    <div className="Row-Right">
                        <div className="EditPopup">
                            <Popup
                                basic
                                on='click'
                                content={
                                    <div className="EditPanel">
                                        <Form onSubmit={handleEdit}>
                                            <div className="EditTitle">
                                                <Form.Input error={titleErrorMsg} label='Title' placeholder='( optional )' size='mini' value={newTitle} onChange={updateNewTitle} />
                                            </div>
                                            <Form.Input label='Description' placeholder='( optional )' size='mini' value={newDescription} onChange={updateNewDescription} />
                                            <Divider />

                                            <Button type='submit' primary content="Submit" size='mini' />
                                        </Form>
                                    </div>
                                }
                                trigger={<Button size='mini' content="Edit" labelPosition='left' icon='edit' />} />
                        </div>
                        <div className="DeleteButton">
                            <Button negative content="Delete" icon="trash" labelPosition='left' size='mini' onClick={handleDelete} />
                        </div>
                    </div>

                </div>

            </List.Content>
        </List.Item>
    )

}

export default TodoItem