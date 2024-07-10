import React from 'react';
import useLocalStorage from '../useLocalStorage';

const withLocalStorage = (key, initialValue) => (WrappedComponent) => {
    return (props) => {
        const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
        return (
            <WrappedComponent
                {...props}
                storedValue={storedValue}
                setStoredValue={setStoredValue}
            />
        );
    };
};

export default withLocalStorage;