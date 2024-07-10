import React, { useState } from "react"; 
// import useLocalStorage from "../useLocalStorage";
import AppContent from "../components/AppContent";
import withLocalStorage from "../hoc/withLocalStorage";
import withTheme from "../hoc/withTheme";

function AppContainer({ storedValue, setStoredValue, theme }) {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [message, setMessage] = useState('');
    const [todos, setTodos] = useState(storedValue || []);

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
        setStoredValue([...todos, newTodo]);// 로컬 스토리지에 저장
    };

    const handleDelete = (index) => {
        const newTodo = todos.filter((_, i) => i !== index); // 첫번째 파라미터: 배열의 현재 요소, 두번째 파라미터: 현재 요소의 인덱스
        setTodos(newTodo);
        setStoredValue(newTodo);// 로컬 스토리지에 저장
    }

    return (
        <AppContent 
            name={name}
            setName={setName}
            task={task}
            setTask={setTask}
            handleClick={handleClick}
            handleDelete={handleDelete}
            message={message}
            todos={todos}
            isDarkMode={theme.isDarkMode}
            toggleTheme={theme.toggleTheme}
        />
    );
}

export default withLocalStorage('todos', [])(withTheme(AppContainer));