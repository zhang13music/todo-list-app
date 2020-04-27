import React, { useState, useContext } from "react";
import { List, Segment, Header, Divider, Checkbox, Message, Statistic } from "semantic-ui-react";

import { TodoContext } from './TodoContext';
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

import "./TodoView.scss";

const TodoView = () => {

  const [todos, updateContext] = useContext(TodoContext);

  const [filtering, setFiltering] = useState(false);

  const filterToggle = () => {
    setFiltering(!filtering);
    updateContext();
  }

  const listContent = () => {
    if (todos.length === 0) {
      return (
        <Message
          warning
          header='Empty List!'
          content='Please use the panel above to create a new to-do.'
        />
      )
    } else {
      return (
        <Segment>
          <div className="ListContent">
            <div className="ListContentHeader">
              <div>
                <Header size='huge'>To-Dos: </Header>
                <Checkbox toggle label="show incomplete tasks only" onChange={filterToggle} checked={filtering} />
              </div>
              <div>
                <Statistic size='tiny' color='teal' label="tasks" value={todos.length} />
              </div>
            </div>
            <Divider />
            <List divided relaxed>
              {todos.map((todo) => {
                if (!filtering || !todo.completed) {
                  return <TodoItem key={todo._id} id={todo._id} />
                } else {
                  return null
                }
              })}
            </List>
          </div>
        </Segment>
      )
    }
  }

  return (
    <div className="View">
      <div className="Title">
        <h1>Full Stack To-Do App</h1>
        <h4>by Tianwei Peter Zhang <sub> / tianwei4@illinois.edu</sub> </h4>
      </div>

      <div className="Input">
        <TodoInput />
      </div>

      <div className="List">
        {listContent()}
      </div>
    </div>
  );
}

export default TodoView;
