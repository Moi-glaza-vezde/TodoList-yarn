import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { TaskType, TodoList } from './TdoList';
import { AddItemForm } from './AddItemForm';
import {
   AppBar,
   Box,
   Button,
   Container,
   Grid,
   Grid2,
   IconButton,
   Paper,
   Toolbar,
   Typography,
} from '@mui/material';
import { Menu, Padding } from '@mui/icons-material';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListType = {
   id: string;
   title: string;
   filter: FilterValuesType;
};

type TasksStateType = {
   [key: string]: TaskType[];
};

function App() {
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
   }

   function changeTaskTitle(taskId: string, newTilte: string, todoListId: string) {
      let tasks = tasksObj[todoListId];

      let task = tasks.find((t) => t.id === taskId);
      if (task) {
         task.title = newTilte;

         setTasks({ ...tasksObj });
      }
   }

   function changeFilter(value: FilterValuesType, todoListId: string) {
      let filterList = todoLists.find((tl) => tl.id === todoListId);

      if (filterList) {
         filterList.filter = value;

         setTodoList([...todoLists]);
      }
   }

   let todoListId1 = v1();
   let todoListId2 = v1();

   let [todoLists, setTodoList] = useState<Array<TodoListType>>([
      { id: todoListId1, title: 'What to learn', filter: 'all' },
      { id: todoListId2, title: 'What to buy', filter: 'all' },
   ]);

   let removeTodoList = (todoListId: string) => {
      let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);

      setTodoList(filteredTodoList);

      delete tasksObj[todoListId];
      setTasks({ ...tasksObj });
   };

   function changeTodolistTitle(id: string, newTitle: string) {
      setTodoList(todoLists.map((tl) => (tl.id === id ? { ...tl, title: newTitle } : tl)));
   }

   let [tasksObj, setTasks] = useState<TasksStateType>({
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

   function addTodoList(title: string) {
      let todoList: TodoListType = {
         id: v1(),
         filter: 'all',
         title: title,
      };
      setTasks({ ...tasksObj, [todoList.id]: [] });
      ``;

      setTodoList([todoList, ...todoLists]);
   }

   return (
      <div className="App">
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}>
                  <Menu />
               </IconButton>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  News
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>
         <Container fixed>
            <Grid2 container style={{ padding: '20px' }}>
               <AddItemForm addItem={addTodoList} />
            </Grid2>
            <Grid2 container spacing={3}>
               {todoLists.map((tl) => {
                  let tasksForTodoList = tasksObj[tl.id];

                  if (tl.filter === 'completed') {
                     tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
                  }
                  if (tl.filter === 'active') {
                     tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
                  }
                  return (
                     <Grid2>
                        <Paper style={{ padding: '10px' }}>
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
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                           />
                        </Paper>
                     </Grid2>
                  );
               })}
            </Grid2>
         </Container>
      </div>
   );
}

export default App;
