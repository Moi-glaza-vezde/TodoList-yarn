import React from 'react';
import './App.css';
import { TodoList } from './TdoList';

function App() {
   let tasks1 = [
      { id: 1, title: 'HTML&CSS', isDone: true },
      { id: 2, title: 'JS', isDone: true },
      { id: 3, title: ' React', isDone: false },
   ];
   let tasks2 = [
      { id: 1, title: 'Terminator', isDone: true },
      { id: 2, title: 'XXL', isDone: true },
      { id: 3, title: 'Lord of War', isDone: false },
   ];

   return (
      <div className="App">
         <TodoList title={'What to learn'} tasks={tasks1} />
         <TodoList title={'Movies'} tasks={tasks1} />
      </div>
   );
}

export default App;
