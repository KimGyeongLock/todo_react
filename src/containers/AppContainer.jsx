import React, { useState } from "react"; 
import useLocalStorage from "../useLocalStorage";
import AppContent from "../components/AppContent";

function AppContainer() {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [message, setMessage] = useState('');
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

    const handleDelete = (index) => {
        const newTodo = todos.filter((_, i) => i !== index); // 첫번째 파라미터: 배열의 현재 요소, 두번째 파라미터: 현재 요소의 인덱스
        setTodos(newTodo);
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
        />
    );
}

export default AppContainer;