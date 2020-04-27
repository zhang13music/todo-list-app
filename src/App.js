import React, { Component } from 'react';

import TodoView from './components/TodoView';
import { TodoProvider } from './components/TodoContext';

import './App.scss';

class App extends Component {

  render() {
    
    return (
      <TodoProvider>
        <div className="App">
          <TodoView />
        </div>
      </TodoProvider>

    );
  }

}

export default App;
