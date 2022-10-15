import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components/common';
import * as Pages from './components/pages';
import './App.css';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Navbar />
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
