import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import Admin from './components/Admin/Admin.jsx';
import User from './components/User/User.jsx';
import HomePage from './components/Home/HomePage.jsx';
import ManageUser from './components/Admin/Content/ManageUser.jsx';
import Dashboard from './components/Admin/Content/Dashboard.jsx';
import Login from './components/Auth/Login.jsx';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/user" element={<User />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </>
    )
}

export default Layout;