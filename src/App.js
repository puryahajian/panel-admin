import './App.css';
import { Route, Routes } from 'react-router-dom';
import Panel from './pages/panel';
import Login from './pages/login'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Panel/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
