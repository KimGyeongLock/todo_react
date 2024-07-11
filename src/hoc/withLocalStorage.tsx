import React, { ComponentType } from 'react';
import useLocalStorage from '../useLocalStorage';

//storedValue와 setStoredValue의 타입을 명시
interface WithLocalStorageProps<T> {
    storedValue: T;
    setStoredValue: (value: T) => void;
} 

//제네릭 타입 추가 - hoc 고차함수
//ComponentType<any>: 어떤 타입의 컴포넌트도 래핑
const withLocalStorage = <T, >(key: string, initialValue: T) => (WrappedComponent: ComponentType<any>) => {
    
    // Omit<any, keyof WithLocalStorageProps<T>>: WithLocalStorageProps<T>에 정의된 prop들을 제외한 나머지 props를 전달받도록
    const WithLocalStorage: React.FC<Omit<any, keyof WithLocalStorageProps<T>>> = (props) => {
        const [storedValue, setStoredValue] = useLocalStorage<T>(key, initialValue);
        return (
            <WrappedComponent
                {...props}
                storedValue={storedValue}
                setStoredValue={setStoredValue}
            />
        );
    };
    return WithLocalStorage;
};

export default withLocalStorage;