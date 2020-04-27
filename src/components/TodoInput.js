import React, { useState, useContext } from 'react'
import { Button, Form, Message, Accordion, Label } from 'semantic-ui-react'
import axios from 'axios';

import { TodoContext } from './TodoContext';

import "./TodoInput.scss";


const TodoInput = () => {

    const [, updateContext] = useContext(TodoContext);

    const [activeIndex, setActiveIndex] = useState(-1);

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const [titleErrorMsg, setTitleErrorMsg] = useState(false);

    const updateNewTitle = e => {
        setNewTitle(e.target.value);
    };

    const updateNewDescription = e => {
        setNewDescription(e.target.value);
    };

    const addNewTodo = e => {

        e.preventDefault();

        if (newTitle === '') {

            setTitleErrorMsg({
                content: 'Title cannot be empty',
                pointing: 'above',
            });

            setFormSuccess(false);

        } else {

            axios
                .post('/api/tasks', {
                    title: newTitle,
                    description: newDescription ? newDescription : "No description",
                })
                .then(() => {
                    updateContext();
                    setTitleErrorMsg(false);
                    setFormSuccess(true);
                    setTimeout(() => {
                        setFormSuccess(false)
                    }, 1500)
                })
                .catch(err => console.log(err))

            setFormSuccess(true);
        }

    };

    const handleAccordion = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index
        setActiveIndex(newIndex)
    }

    return (
        <div className="Form">

            <Accordion styled fluid inverted>

                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={handleAccordion}
                >
                    <Label ribbon color='green' content="Add a New To-Do" icon="pencil" />
                </Accordion.Title>

                <Accordion.Content active={activeIndex === 0}>
                    <Form success={formSuccess} onSubmit={addNewTodo} >
                        <Form.Group widths={2}>
                            <Form.Input error={titleErrorMsg} label='Title:' placeholder='Enter title' value={newTitle} onChange={updateNewTitle} />
                            <Form.Input label='Description(optional): ' placeholder='Enter description' value={newDescription} onChange={updateNewDescription} />
                        </Form.Group>
                        <Button primary type='submit' content="Submit" icon="mail" labelPosition='left' size="small" />
                        <Message
                            success
                            icon='inbox'
                            header='Submission Completed'
                            content="Task was successfully created"
                        />
                    </Form>
                </Accordion.Content>

            </Accordion>

        </div>
    )
}

export default TodoInput
