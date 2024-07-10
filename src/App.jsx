import React from 'react';
import { ThemeProvider } from './ThemeContext'; // useTheme : custom hook
import AppContainer from './containers/AppContainer';

//ThemeProvider 컴포넌트의 자식 요소들은 ThemeContext의 값을 사용할 수 있게 됩니다.
//isDarkMode와 toggleTheme
//AppContent에서는 ThemeContext의 값을 사용할 수 있게 됩니다.
function App() {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}

export default App;
