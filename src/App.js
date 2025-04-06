import './App.css';
import { Route, Routes } from 'react-router-dom';
import Panel from './pages/panel';
import Login from './pages/login'
import Chat from './pages/chat';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Panel/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
