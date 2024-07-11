import React from 'react';
import { ThemeProvider } from './ThemeContext'; // useTheme : custom hook
import AppContainer from './containers/AppContainer';

//React.FC 타입을 추가
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}

export default App;
