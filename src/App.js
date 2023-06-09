import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
