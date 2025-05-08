import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { CarritoProvider } from './context/CarritoContext'; 

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider> 
        <div className='bg-gray-100'>
          <AppRouter />
        </div>
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;
