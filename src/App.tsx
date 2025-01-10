import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TdoList';
import { v1 } from 'uuid';
export type FilterValuesType = 'all' | 'active' | 'completed';
function App() {
   // let initTasks: Array<TaskType> = ;

   let [tasks, setTasks] = useState([
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
   ]);

   let [filter, setFilter] = useState<FilterValuesType>('all');

   function changeFilter(value: FilterValuesType) {
      setFilter(value);
   }
   function removeTask(id: string) {
      let filteredTasks = tasks.filter((t) => id !== t.id);

      setTasks(filteredTasks);
   }
   //------------------------------------------- 3 урок
   function addTask(titleValue: string) {
      let newTask = { id: v1(), title: titleValue, isDone: false };
      let newTasks = [newTask, ...tasks];

      setTasks(newTasks);
   }
   //------------------------------------------- 3 урок/
   let tasksForTodoList = tasks;
   if (filter === 'completed') {
      tasksForTodoList = tasks.filter((t) => t.isDone);
   }
   if (filter === 'active') {
      tasksForTodoList = tasks.filter((t) => !t.isDone);
   }

   return (
      <div className="App">
         <TodoList
            title={'What to learn'}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
         />
      </div>
   );
}

export default App;
