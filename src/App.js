import './index.css';
import Header from './components/Header';
import Employees from './pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';

function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/' element={<Employees />} />
          <Route path='/Customers' element={<Customers />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );

}

export default App;
