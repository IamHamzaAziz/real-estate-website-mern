import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './layouts/PageLayout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Team from './pages/Team';
import Properties from './pages/Properties';
import Blogs from './pages/Blogs';
import VerifyOTP from './pages/VerifyOTP';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/team' element={<Team />} />
          <Route path='/properties' element={<Properties />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/verify-otp' element={<VerifyOTP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
