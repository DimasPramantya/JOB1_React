import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import FormPermohonan from './page/client/FormPermohonan';
import FormMessage from './page/client/FormMessage';
import LoginSuperUser from './page/super user/Login';
import SuperUserDashboard from './page/super user/Dashboard';
import ProsesTerima from './page/super user/ProsesTerima';
import ProsesTolak from './page/super user/ProsesTolak';
import LogClient from './page/super user/LogClient';
import TambahClient from './page/super user/TambahClient';
import AdminJadwalClient from './page/super user/JadwalClient';
import AdminJadwalKantor from './page/super user/JadwalKantor';
import AdminJadwalPersidangan from './page/super user/JadwalPersidangan';
import Pegawai from './page/super user/Pegawai';
import UserLogin from './page/user/Login';
import UserDashboard from './page/user/Dashboard';
import UserMeetingClient from './page/user/JadwalMeetingClient';
import UserJadwalPersidangan from './page/user/JadwalPersidangan';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path='/form-permohonan' element={<FormPermohonan/>}/>
          <Route path='/form-message' element={<FormMessage/>}/>
          <Route path='/super-user/login' element={<LoginSuperUser/>}/>
          <Route path='/super-user' element={<SuperUserDashboard/>}/>
          <Route path='/super-user/log-client' element={<LogClient/>}/>
          <Route path='/super-user/tambah-client' element={<TambahClient/>}/>
          <Route path='/super-user/jadwal-client' element={<AdminJadwalClient/>}/>
          <Route path='/super-user/jadwal-kantor' element={<AdminJadwalKantor/>}/>
          <Route path='/super-user/pegawai' element={<Pegawai/>}/>
          <Route path='/super-user/jadwal-persidangan' element={<AdminJadwalPersidangan/>}/>
          <Route path='/super-user/proses-terima/:IDLogClient' element={<ProsesTerima/>}/>
          <Route path='/super-user/proses-tolak/:IDLogClient' element={<ProsesTolak/>}/>
          <Route path="/user/login" element={<UserLogin/>}/>
          <Route path="/user" element={<UserDashboard/>}/>
          <Route path='/user/jadwal-client' element={<UserMeetingClient/>}/>
          <Route path='/user/jadwal-persidangan' element={<UserJadwalPersidangan/>}/>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
