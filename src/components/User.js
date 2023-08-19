import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../App.css';

function User({ error }) {

  const navigate = useNavigate();

  const notFound = () => {
    if(error) {
      return <div>Page Not Found</div>
    }
  }

  const logOut = () => {
    navigate("/",{ replace: true })
  }

  return (
    
    <>
    
      <header>

        <NavLink to="profile">Profile</NavLink>
        <NavLink to="cart">Cart</NavLink>
        <button onClick={() => logOut()}>Logout</button>

      </header>

      <div className="App">

        <Outlet />

        {notFound()}

      </div>
    
    </>
  );
}

export default User;
