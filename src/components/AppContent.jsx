import React from "react";
// import { useTheme } from "../ThemeContext";
import { MdDelete } from "react-icons/md";
import './AppContent.css';

function AppContent({ name, setName, task, setTask, handleClick, handleDelete, message, todos, isDarkMode, toggleTheme }) {
  // const { isDarkMode, toggleTheme } = useTheme(); //useTheme 훅을 호출하여 isDarkMode와 toggleTheme에 쉽게 접근할 수 있습니다.
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
            <li key={index}>
              {todo.task} ({todo.formattedTime})
              <button className="icon-button" onClick={() => handleDelete(index)}>
                <MdDelete style={{ fontSize: '17px' }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
  );
}

export default AppContent;