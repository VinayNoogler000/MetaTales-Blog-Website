import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        }
        else {
          dispatch(logout());
        }
      })
      .catch(err => console.error("Unable to Get Curr User Status", err))
      .finally(() => setLoading(false));
  }, []);

  return loading ? null : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
      <ToastContainer stacked/>
    </div >
  )
}

export default App