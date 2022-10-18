import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    }

  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
