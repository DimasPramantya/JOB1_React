import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import FormPermohonan from './page/client/FormPermohonan';
import FormMessage from './page/client/FormMessage';
import LoginSuperUser from './page/super user/Login';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path='/form-permohonan' element={<FormPermohonan/>}/>
          <Route path='/form-message' element={<FormMessage/>}/>
          <Route path='/super-user/login' element={<LoginSuperUser/>}/>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
