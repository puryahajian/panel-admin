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

  // const handleExit = () => {
  //   setOpen(false); 
  //   navigate('/login');
  //   Cookies.remove('access');
  //   Cookies.remove('refresh');
  // }

  return (
   <Routes>
      {/* مسیر لاگین بدون چیدمان */}
      <Route element={<Middleware />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* مسیرهای محافظت‌شده با چیدمان */}
      <Route
        element={
          <div className="grid grid-cols-6">
            <div className='max-[1024px]:hidden'>
              <SideBar />
            </div>
            <div className="w-full col-span-5 max-[1024px]:col-span-6">
              <HeaderResponsive step={step} setStep={setStep} />
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/management" element={<ManagementPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/discounts" element={<DiscountsPage />} />
                <Route path="/tickets/:id" element={<Tickets />} />
              </Routes>
            </div>
          </div>
        }
      >
        <Route path="/*" />
      </Route>
    </Routes>
  );
}

export default App;
