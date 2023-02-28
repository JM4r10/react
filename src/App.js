import './index.css';
import Header from './components/Header';
import Employees from './pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import CatStatus from './components/CatStatus';
import Customer from './pages/Customer';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
        <Route path='/' element={<Employees />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path='/dictionary/:search' element={<Definition />}/>
          <Route path='/customers' element={<Customers />} />
          <Route path='/customers/:id' element={<Customer />} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/404' element={<CatStatus />} />
          <Route path='/*' element={<CatStatus />} /> {/* path='/*': if the url doent match any of the previous routes the navigator is redirected to the element NotFound */}
        </Routes>
      </Header>
      <footer>Example Footer</footer>
    </BrowserRouter>
  );

}

export default App;
