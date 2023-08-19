import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorPage from './components/ErrorPage/ErrorPage';
import User from './components/User';
import store from './store';
import Posts from './components/PostList/Index';


const AddPost = React.lazy(() => import("./components/AddPost/AddPost"))
const Details = React.lazy(() => import("./components/Details/Details"))
const EditPost = React.lazy(() => import("./components/Edit/EditPost"))

const postParamHandler = ({ params }) => {
  if(isNaN(params.id)){
    throw new Response("Bad Request",{
      statusText: "Please Make Sure to insert correct post ID",
      status: 400
    });
  }
  return '';
}

const router = createBrowserRouter([

  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      { index: true, element: <div>Home</div> },
      {
        path: '/posts',
        element: <Posts />,
      },      {
        path: '/post/add',
        element: 
          <Suspense fallback="Please Wait...">
            <AddPost />
          </Suspense>
      },
      {
        path: '/post/:id',
        element: 
        <Suspense fallback="Please Wait...">
          <Details />
        </Suspense>,
        loader: postParamHandler
      },
      {
        path: '/post/:id/edit',
        element: 
        <Suspense fallback="Please Wait...">
          <EditPost />
        </Suspense>,
        loader: postParamHandler
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
        element: <div>Cart</div>,
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>

    <RouterProvider router={router} />

  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
