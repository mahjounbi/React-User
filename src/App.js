import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './containers/Login/Login';
import Users from './containers/Users';
import AddEditUser from './containers/Users/AddEditUser';
import UserDetails from './containers/Users/UserDetails';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
        <Route path="/users/addUser" element={<ProtectedRoute element={<AddEditUser />} />}/>
        <Route path="/users/:id" element={<ProtectedRoute element={<UserDetails />} />}/>
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
