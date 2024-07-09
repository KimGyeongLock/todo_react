import { useState } from "react";

function useLocalStorage(key, initialValue) {
    // 로컬 스토리지에서 값을 가져오거나 초기값 설정
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key); // 키값을 사용하여 값을 가져옴
            return item ? JSON.parse(item) : initialValue; // 값이 없으면 initialValue
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // 저장된 값을 storedValue에 업데이트하고 로컬 스토리지에 저장
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value; //value가 함수인 경우, storedValue를 인자로 전달하여 계산
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;