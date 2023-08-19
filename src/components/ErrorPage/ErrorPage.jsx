import React from 'react';
import './error.css';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {

    const error = useRouteError();

    const navigate = useNavigate();

    return (
    <div className='container-error'>

        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>{ error.statusText || error.status }</p>

        <button onClick={() => navigate('/')}>Link</button>

    </div>
  )
}

export default ErrorPage