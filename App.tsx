
import React from 'react';
import ChatInterface from './components/ChatInterface';
import { ThemeProvider } from './components/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ChatInterface />
    </ThemeProvider>
  );
};

export default App;
