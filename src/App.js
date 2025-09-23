import '../src/App.css'
import { useSelector , useDispatch } from 'react-redux';
import { getCurrentUser } from './features/slices/authslice';
import Navigation from "./navigation/Navigation";
import { PulseLoader } from 'react-spinners';
import { useState, useEffect } from 'react';

function App() {
 const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser(setLoading));
  }, []);
     const user = useSelector((state) => state.auth.User);
   console.log("User in App.js", user);
  return (
    <>
    {(loading) ? <div className="loading-container"><PulseLoader color="#000" /></div> : <Navigation />}
    </>

  );
}

export default App;
