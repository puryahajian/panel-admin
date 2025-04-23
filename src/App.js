import './App.css';
import { Route, Routes } from 'react-router-dom';
import Panel from './pages/panel';
import Login from './pages/login'
import Chat from './pages/chat';
import Middleware from './lib/middleware';


function App() {
  return (
    <div>
      <Routes>
        <Route element={<Middleware />}>
          <Route path='/' element={<Panel/>}/>
          <Route path='/chat/:id' element={<Chat/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
