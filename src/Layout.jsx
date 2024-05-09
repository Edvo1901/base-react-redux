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
import SignUp from './components/Auth/SignUp.jsx';
import ListQuiz from './components/User/ListQuiz.jsx';
import DetailQuiz from './components/User/DetailQuiz.jsx';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz.jsx';
import Questions from './components/Admin/Content/Question/Questions.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { Suspense } from 'react';

const Layout = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/user" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="dark"
                transition={Bounce}
            />
        </Suspense>
    )
}

export default Layout;