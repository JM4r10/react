import './index.css';
import Header from './components/Header';
import Employees from './pages/Employees';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';
import NotFound from './components/NotFound';


function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route
            path='/dictionary/:search'
            element={<Definition />}
          />
          <Route path='/customers' element={<Customers />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='/*' element={<NotFound />} /> {/* path='/*': if the url doent match any of the previous routes the navigator is redirected to the element NotFound */}
        </Routes>
      </Header>
      <footer>Example Footer</footer>
    </BrowserRouter>
  );

}

export default App;
