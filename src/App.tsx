import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { CarritoProvider } from './context/CarritoContext'; 
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider> 
        <div className='bg-gray-100'>
        <UserProvider>
          <AppRouter />
          <ToastContainer />
        </UserProvider>
        </div>
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;
