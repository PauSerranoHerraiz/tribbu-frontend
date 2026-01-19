import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import EventsSection from "./EventsSection";
import tribbuService from "../../services/tribbu.service";

function EventsPage() {
  const { user } = useContext(AuthContext);
  const [tribbus, setTribbus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tribbuService
      .getUserTribbus()
      .then((res) => {
        setTribbus(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Mis Eventos</h1>
      <div className="space-y-8">
        {tribbus.map((tribbu) => (
          <div key={tribbu._id}>
            <h2 className="text-xl font-semibold text-slate-700 mb-4">{tribbu.name}</h2>
            <EventsSection tribbuId={tribbu._id} role={tribbu.role} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;