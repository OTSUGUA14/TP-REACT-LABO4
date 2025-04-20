
import './App.css'


import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter';


function App() {

  return (
    <BrowserRouter>
      <div className='bg-gray-100'>

        <AppRouter></AppRouter>
      </div>
    </BrowserRouter>
  )
}

export default App