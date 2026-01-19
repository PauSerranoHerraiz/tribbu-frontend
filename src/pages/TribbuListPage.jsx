import { useState, useEffect, useContext } from "react";
import tribbusService from "../services/tribbu.service"; 
import AddTribbu from "../components/CreateTribbu"; 
import TribbuCard from "../components/TribbuCard";
import { AuthContext } from "../context/auth.context";

function TribbuListPage() {
  const [tribbus, setTribbus] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllTribbus = () => {
    tribbusService
      .getAllTribbus()
      .then((response) => setTribbus(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTribbus();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tribbus.length === 0 ? (
          <p className="text-slate-500 italic col-span-full text-center">
            No hay Tribbus disponibles.
          </p>
        ) : (
          tribbus.map((tribbu) => (
            <TribbuCard 
              key={tribbu._id} 
              {...tribbu}
              userId={user?._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TribbuListPage;
