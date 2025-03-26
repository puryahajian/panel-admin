import './App.css';
import { Route, Routes } from 'react-router-dom';
import Panel from './pages/panel';
import Login from './pages/login'
import Middleware from './lib/middleware';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route element={<Middleware />}>
          <Route path='/' element={<Panel/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
