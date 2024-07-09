import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext'; // useTheme : custom hook
import useLocalStorage from './useLocalStorage';
import './App.css';

function AppContent() {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [message, setMessage] = useState('');
  const { isDarkMode, toggleTheme } = useTheme(); //useTheme 훅을 호출하여 isDarkMode와 toggleTheme에 쉽게 접근할 수 있습니다.
  const [todos, setTodos] = useLocalStorage('todos', []);

  const handleClick = () => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const formattedTime = `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}시 ${formattedMinutes}분`
    setMessage(`이름: ${name} 날짜: ${formattedTime}`);

    const newTodo = { task, formattedTime };
    setTodos([...todos, newTodo]); // ...은 JavaScript의 스프레드 연산자(Spread Operator)
    //기존의 todos 배열에 새로운 newTodo 항목을 추가하여 업데이트된 배열을 만드는 방식
  };

  return (
    //'container dark' or 'container light'
    <div className={`container ${isDarkMode ? 'dark' : 'light'}`}> 
      <header>Todo</header>
      <button onClick={toggleTheme}>
        {isDarkMode ? '라이트 모드' : '다크 모드'}
      </button>
      <input 
        placeholder="이름" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        placeholder="할 일" 
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleClick}>확인</button>
      {message && <p>{message}</p>} 
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.task} ({todo.formattedTime})</li>
        ))}
      </ul>
    </div>
  );
}

//ThemeProvider 컴포넌트의 자식 요소들은 ThemeContext의 값을 사용할 수 있게 됩니다.
//isDarkMode와 toggleTheme
//AppContent에서는 ThemeContext의 값을 사용할 수 있게 됩니다.
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
