import './App.css';
import { Route, Routes } from 'react-router-dom';
import Panel from './pages/panel';
import Login from './pages/login'
import Tickets from './components/molecules/ticket/tickets';
import Middleware from './lib/middleware';


function App() {
  return (
    <div>
      <Routes>
        <Route element={<Middleware />}>
          <Route path='/' element={<Panel/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/tickets/:id' element={<Tickets/>}/>
      </Routes>
    </div>
  );
}

export default App;
