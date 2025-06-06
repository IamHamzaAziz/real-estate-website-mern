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
import ContactMessages from './pages/admin/ContactMessages';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageProperties from './pages/admin/ManageProperties';
import UpdateProperty from './pages/admin/UpdateProperty';
import SavedProperties from './pages/SavedProperties';
import UpdateBlog from './pages/admin/UpdateBlog';
import ManageUsers from './pages/admin/ManageUsers';
import EnterEmailPassReset from './pages/EnterEmailPassReset';
import PasswordReset from './pages/PasswordReset';
import LogoutReq from './protected_routes/LogoutReq';
import LoginReq from './protected_routes/LoginReq';
import OnlyAdmin from './protected_routes/OnlyAdmin';
import About from './pages/About';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/sign-up' element={<LogoutReq><SignUp /></LogoutReq>} />
            <Route path='/sign-in' element={<LogoutReq><SignIn /></LogoutReq>} />
            <Route path='/team' element={<Team />} />
            <Route path='/properties' element={<Properties />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/verify-otp' element={<VerifyOTP />} />
            <Route path='/blog/:slug' element={<BlogDetails />} />
            <Route path='/property/:slug' element={<PropertyDetails />} />
            <Route path='/saved-properties' element={<LoginReq><SavedProperties /></LoginReq>} />
            <Route path='/enter-email-password-reset' element={<EnterEmailPassReset />} />
            <Route path='/password-reset' element={<PasswordReset />} />

            <Route path='/admin' element={<OnlyAdmin><AdminDashboardLayout /></OnlyAdmin>}>
              <Route index element={<Dashboard />} />
              <Route path='add-blog' element={<AddBlog />} />
              <Route path='add-property' element={<AddProperty />} />
              <Route path='contact-messages' element={<ContactMessages />} />
              <Route path='manage-blogs' element={<ManageBlogs />} />
              <Route path='manage-properties' element={<ManageProperties />} />
              <Route path='update-property/:slug' element={<UpdateProperty />} />
              <Route path='update-blog/:slug' element={<UpdateBlog />} />
              <Route path='manage-users' element={<ManageUsers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
