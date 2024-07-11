import React, { createContext, useState, useContext, ReactNode } from 'react';

// Context 타입 정의
//isDarkMode와 toggleTheme의 타입을 명시
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Context 생성
// 기본값으로 undefined를 설정하고, ThemeContextType | undefined 타입을 사용
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//children의 타입을 ReactNode로 명시
interface ThemeProviderProps {
  children: ReactNode;
}

//React.FC<ThemeProviderProps>로 정의
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
//ThemeContextType 타입을 반환
//ThemeContext의 값을 가져오고, context가 undefined인 경우 오류를 던지도록 했습니다. 이렇게 하면 ThemeProvider 외부에서 useTheme을 사용하는 것을 방지할 수 있습니다.
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if(!context) { // Type Guards
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
