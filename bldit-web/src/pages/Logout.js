import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from "../hooks/useLogout";

const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  
  useEffect(() => {
    const signOut = async () => {
      await logout();
    }
    signOut().then(() => 
      navigate("/", {replace: true})
    ).catch(_ => {
      navigate("/", {replace: true})
    });
  }, []);
  
  return (
    <div>
      Logging Out...
    </div>
  );
};

export default Logout;