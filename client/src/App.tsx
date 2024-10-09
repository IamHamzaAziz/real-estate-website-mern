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
import { UserContextProvider } from './context/UserContext';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import AddProperty from './pages/admin/AddProperty';
import BlogDetails from './pages/BlogDetails';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  return (
    <UserContextProvider>
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
            <Route path='/blog/:slug' element={<BlogDetails />} />
            <Route path='/property/:slug' element={<PropertyDetails />} />

            <Route path='/admin' element={<AdminDashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='add-blog' element={<AddBlog />} />
              <Route path='add-property' element={<AddProperty />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
