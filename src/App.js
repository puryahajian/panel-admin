import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Panel from './pages/panel';
import Login from './pages/login'
import Tickets from './components/molecules/ticket/tickets';
import Middleware from './lib/middleware';
import SideBar from './components/molecules/side-bar';
import DashboardPage from './pages/dashboard-page';
import OrdersPage from './pages/orders-page';
import ProductsPage from './pages/products-page';
import ManagementPage from './pages/management-page';
import SettingsPage from './pages/settings-page';
import DiscountsPage from './pages/discounts-page';
import HeaderResponsive from './components/molecules/header-responsive';
import { useState } from 'react';
import GeneralModal from './components/molecules/modal-general';
import Cookies from "js-cookie";

function App() {
  const [step, setStep] = useState();
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleExit = () => {
    setOpen(false); 
    navigate('/login');
    Cookies.remove('access');
    Cookies.remove('refresh');
  }

  return (
    <div className='flex'>
      <SideBar/>
      <HeaderResponsive step={step} setStep={setStep}/>

      <div className='w-full'>
        <Routes>
          <Route element={<Middleware />}>
            <Route path='/login' element={<Login/>}/>
          </Route>

            {/* <Route path='/' element={<Panel/>}/> */}

          <Route path='/' element={<DashboardPage/>}/>
          <Route path='/orders' element={<OrdersPage/>}/>
          <Route path='/products' element={<ProductsPage/>}/>
          <Route path='/management' element={<ManagementPage/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/discounts' element={<DiscountsPage/>}/>

          <Route path='/tickets/:id' element={<Tickets/>}/>
        </Routes>
      </div>

      <GeneralModal
        open={open}
        handleClose={(e) => {
            e.preventDefault();
            setOpen(false)
        }}
        title="آیا می خواهید از اکانت خود خارج شوید ؟"
        // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
        actionText="بله"
        actionHandler={(e) => { 
            e.preventDefault();
            handleExit()
        }}
      />
    </div>
  );
}

export default App;
