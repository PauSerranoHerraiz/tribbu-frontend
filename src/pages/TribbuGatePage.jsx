import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function TribbuGatePage (){
const { user, isLoading } = useContext(AuthContext);
const navigate = useNavigate();

useEffect(() => {
  if (isLoading) return; 

  if (!user) {
    navigate("/login"); 
  } else if (!user.tribbu) {
    navigate("/create-tribbu"); 
  } else {
    navigate(`/tribbus/${user.tribbu._id}`);
  }
}, [user, isLoading]);
}
export default TribbuGatePage