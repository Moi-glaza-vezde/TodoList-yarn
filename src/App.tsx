import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { TaskType, TodoList } from './TdoList';

export type FilterValuesType = 'all' | 'active' | 'completed';
function App() {
   type TodoListType = {
      id: string;
      title: string;
      filter: FilterValuesType;
   };

   // let [tasks, setTasks] = useState([
   //    { id: v1(), title: 'HTML&CSS', isDone: true },
   //    { id: v1(), title: 'JS', isDone: true },
   //    { id: v1(), title: 'React', isDone: false },
   //    { id: v1(), title: 'Redux', isDone: false },
   // ]);

   // let [filter, setFilter] = useState<FilterValuesType>('all');

   function removeTask(id: string, todoListId: string) {
      let tasks = tasksObj[todoListId];

      let filteredTasks = tasks.filter((t) => id !== t.id);
      tasksObj[todoListId] = filteredTasks;

      setTasks({ ...tasksObj });
   }
   function addTask(titleValue: string, todoListId: string) {
      let task = { id: v1(), title: titleValue, isDone: false };

      let tasks = tasksObj[todoListId];

      let newTasks = [task, ...tasks];

      tasksObj[todoListId] = newTasks;

      setTasks({ ...tasksObj });
   }

   function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
      let tasks = tasksObj[todoListId];

      let task = tasks.find((t) => t.id === taskId);
      if (task) {
         task.isDone = isDone;

         setTasks({ ...tasksObj });
      }

      // if (t.id === taskId) {
      //    return true;
      // } else {
      //    return false;
      // }
   }

   function changeFilter(value: FilterValuesType, todoListId: string) {
      let filterList = todoList.find((tl) => tl.id === todoListId);

      if (filterList) {
         filterList.filter = value;

         setTodoList([...todoList]);
      }
   }

   let todoListId1 = v1();
   let todoListId2 = v1();

   let [todoList, setTodoList] = useState<Array<TodoListType>>([
      { id: todoListId1, title: 'What to learn', filter: 'active' },
      { id: todoListId2, title: 'What to buy', filter: 'completed' },
   ]);

   let removeTodoList = (todoListId: string) => {
      let filteredTodoList = todoList.filter((tl) => tl.id !== todoListId);

      setTodoList(filteredTodoList);

      delete tasksObj[todoListId];
      setTasks({ ...tasksObj });
   };

   let [tasksObj, setTasks] = useState({
      [todoListId1]: [
         { id: v1(), title: 'HTML&CSS', isDone: true },
         { id: v1(), title: 'JS', isDone: true },
         { id: v1(), title: 'React', isDone: false },
         { id: v1(), title: 'Redux', isDone: false },
      ],
      [todoListId2]: [
         { id: v1(), title: 'Book', isDone: true },
         { id: v1(), title: 'Milk', isDone: true },
         { id: v1(), title: 'Chocolate', isDone: false },
         { id: v1(), title: 'Tomato', isDone: false },
      ],
   });
   return (
      <div className="App">
         {todoList.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];

            if (tl.filter === 'completed') {
               tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
            }
            if (tl.filter === 'active') {
               tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
            }
            return (
               <TodoList
                  id={tl.id}
                  key={tl.id}
                  title={tl.title}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeStatus={changeStatus}
                  filter={tl.filter}
                  removeTodoList={removeTodoList}
               />
            );
         })}
         {/* <TodoList
            title={'What to learn'}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={filter}
         /> */}
      </div>
   );
}

export default App;
