import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Menu } from './components/common';
import * as Pages from './components/pages';
import './App.css';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Pages.Home />} />
        <Route path='/login' element={<Pages.Login />} />
        <Route path='*' element={<Pages.Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
