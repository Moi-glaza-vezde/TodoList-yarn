import React from 'react';
import './App.css';
import { TodoList } from './TdoList';

function App() {
   return (
      <div className="App">
         <TodoList title={'What to learn'} />
         <TodoList title={'Movies'} />
      </div>
   );
}

export default App;
