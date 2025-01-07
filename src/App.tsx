import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TdoList';

function App() {
   // let tasks: Array<TaskType> = [
   //    { id: 1, title: 'HTML&CSS', isDone: true },
   //    { id: 2, title: 'JS', isDone: true },
   //    { id: 3, title: 'React', isDone: false },
   //    { id: 4, title: 'Redux', isDone: false },
   // ];

   let [tasks, setTasks] = useState([
      { id: 1, title: 'HTML&CSS', isDone: true },
      { id: 2, title: 'JS', isDone: true },
      { id: 3, title: 'React', isDone: false },
      { id: 4, title: 'Redux', isDone: false },
   ]);

   function removeTask(id: number) {
      setTasks((tasks = tasks.filter((t) => id !== t.id)));
   }
   return (
      <div className="App">
         <TodoList title={'What to learn'} tasks={tasks} removeTask={removeTask} />
      </div>
   );
}

export default App;
