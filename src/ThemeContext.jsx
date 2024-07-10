import React, { createContext, useState, useContext } from 'react';

// Create the Theme Context
// 컨텍스트는 리액트 애플리케이션에서 전역적으로 데이터를 공유할 수 있는 방법을 제공
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => { //하위 컴포넌트들에게 테마 상태와 테마를 전환하는 함수를 제공
  const [isDarkMode, setIsDarkMode] = useState(false); // isDarkMode = false 로 초기화 

  const toggleTheme = () => { //isDarkMode 상태를 반전시키는 함수
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
// useTheme는 ThemeContext를 사용하기 위한 커스텀 훅입니다.
//useContext 훅을 사용하여 ThemeContext의 값을 반환합니다. 
//이렇게 하면 컴포넌트에서 useTheme 훅을 호출하여 isDarkMode와 toggleTheme에 쉽게 접근할 수 있습니다.
export const useTheme = () => useContext(ThemeContext);
