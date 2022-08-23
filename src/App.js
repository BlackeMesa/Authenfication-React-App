import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import SignInModal from './components/SignInModals';
import SignUpModal from './components/SignUpModal';
import Home from './pages/Home';
import Private from './pages/Private/Private';
import PrivateHome from './pages/Private/PrivateHome/PrivateHome';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <SignUpModal />
      <SignInModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;