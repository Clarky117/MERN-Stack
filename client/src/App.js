import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Header from './components/Header';

function App() {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }

  ])

  return (
    <div>
      <Container>
        <Header />
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
