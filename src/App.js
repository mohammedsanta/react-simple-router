import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App({ error }) {

  const notFound = () => {
    if(error) {
      return <div>Page Not Found</div>
    }
  }

  return (
    
    <>
    
      <header>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/post/add">Add Post</NavLink>
        <NavLink to="/user">Login</NavLink>

      </header>

      <div className="App">

        <Outlet />

        {notFound()}

      </div>
    
    </>
  );
}

export default App;
