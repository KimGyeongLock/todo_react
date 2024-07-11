import React from "react";
import { MdDelete } from "react-icons/md";
import './AppContent.css';

// Prop 타입 정의
// AppContent 컴포넌트에 전달되는 props의 타입을 명시
interface Todo {
  task: string;
  formattedTime: string;
}

interface AppContentProps {
  name: string;
  setName: (name: string) => void;
  task: string;
  setTask: (task: string) => void;
  handleClick: () => void;
  handleDelete: (index: number) => void;
  message: string;
  todos: Todo[];
  isDarkMode: boolean;
  toggleTheme: () => void;
}

//React.FC<AppContentProps>: AppContentProps 타입의 props를 받는 함수형 컴포넌트
const AppContent: React.FC<AppContentProps> = ({
  name,
  setName,
  task,
  setTask,
  handleClick,
  handleDelete,
  message,
  todos,
  isDarkMode,
  toggleTheme
}) => {
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
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default AppContent;