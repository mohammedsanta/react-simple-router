import { useSelector } from "react-redux"

const withGuard = ( Component ) => {
  const Wrappepr = ( props ) => {
  
    const { isLoggedIn } = useSelector((state) => state.auth);

    console.log(props)
    
    return (
        isLoggedIn ? <Component {...props} /> : <p>Please Login</p>
      )
  }
  return Wrappepr
}

export default withGuard