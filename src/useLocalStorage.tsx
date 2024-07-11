import { useState } from "react";

//[T, (value: T | ((val: T) => T)) => void]로 명시
function useLocalStorage<T>(key:string, initialValue:T): [T, (value: T | ((val: T) => T)) => void] {
    // 로컬 스토리지에서 값을 가져오거나 초기값 설정
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key); // 키값을 사용하여 값을 가져옴
            return item ? JSON.parse(item) : initialValue; // 값이 없으면 initialValue
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // 저장된 값을 storedValue에 업데이트하고 로컬 스토리지에 저장
    //type: (value: T | ((val: T) => T)) => void : value가 직접적인 값이거나 함수일 수 있음을 나타냈습니다.
    const setValue = (value: T | ((val: T) => T)) => {
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