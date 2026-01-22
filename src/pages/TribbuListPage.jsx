import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import tribbusService from "../services/tribbu.service"; 
import AddTribbu from "../components/CreateTribbu"; 
import TribbuCard from "../components/TribbuCard";
import EmptyState from "../components/ui/EmptyState";
import { AuthContext } from "../context/auth.context";

function TribbuListPage() {
  const [tribbus, setTribbus] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const getAllTribbus = () => {
    if (!user) return;
    setLoading(true);
    const userId = String(user._id);

    tribbusService
      .getAllTribbus()
      .then((response) => {
        const userTribbus = response.data.filter((tribbu) => {
          const owner = String(tribbu.ownerId?._id || tribbu.ownerId);
          const isOwner = owner === userId;

          const isMember = tribbu.members?.some(
            (m) => String(m.userId?._id || m.userId) === userId
          );

          return isOwner || isMember;
        });

        setTribbus(userTribbus);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllTribbus();
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-slate-500">Cargando tribbus...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tribbus.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              title="No tienes Tribbus todavía"
              description="Crea tu primera Tribbu para empezar a organizar planes con tu grupo"
              action={
                <Link to="/create-tribbu" className="btn btn-primary">
                  Crear Tribbu
                </Link>
              }
            />
          </div>
        ) : (
          tribbus.map((tribbu) => (
            <TribbuCard 
              key={tribbu._id} 
              {...tribbu}
              userId={user?._id}
              onTribbuDeleted={getAllTribbus}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TribbuListPage;