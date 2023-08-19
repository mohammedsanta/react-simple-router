import React from 'react'
import { useSelector } from 'react-redux';

const WithGuard = ({ children }) => {

    const newComponent = React.cloneElement(children, { title: "test" });

    const { isLoggedIn } = useSelector((state) => state.auth);


  return isLoggedIn ? newComponent : <p>Please Login</p>;
}

export default WithGuard