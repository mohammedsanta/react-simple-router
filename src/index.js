import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import User from './User';


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <App error={true} />,
    element: <App />,
    children: [
      { index: true, element: <div>Home</div> },
      {
        path: 'product',
        element: <div>product</div>
      },
    ]
  },
  {
    path: 'user',
    element: <User />,
    children: [
      { index: true, element: <div>You Are Logged in</div> },
      {
        path: 'profile',
        element: <div>Profile</div>
      },
      {
        path: 'cart',
        element: <div>Cart</div>
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <RouterProvider router={router}>

      

    </RouterProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
