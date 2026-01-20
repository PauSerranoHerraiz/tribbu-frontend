import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import tribbuService from "../services/tribbu.service";

function HomePage() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tribbus, setTribbus] = useState([]);
  const [loadingTribbus, setLoadingTribbus] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/demo");
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    setLoadingTribbus(true);
    tribbuService
      .getUserTribbus()
      .then((res) => setTribbus(res.data || []))
      .catch(() => setTribbus([]))
      .finally(() => setLoadingTribbus(false));
  }, [user]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando...</p>
      </div>
    );

  if (!user) return null;

  if (loadingTribbus)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando tribbus...</p>
      </div>
    );

  if (!tribbus.length)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">
          No tienes tribbus asignadas aún.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center space-y-6">
      {tribbus.map((tribbu) => {
        const { name, _id, members = [] } = tribbu;
        const userMember = members.find(
          (member) => String(member.userId) === String(user._id)
        );
        const role = userMember?.role || "SABIO";
        const memberCount = members.length;

        return (
          <Link
            key={_id}
            to={`/tribbus/${_id}`}
            className="w-full max-w-2xl block"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
              <h1 className="text-2xl font-semibold text-slate-800 mb-2">
                {name}
              </h1>
              <p className="text-slate-600">
                Tu rol:{" "}
                <strong className="text-indigo-600">{role}</strong> · Miembros:{" "}
                <strong>{memberCount}</strong>
              </p>
              <p className="text-sm text-indigo-600 mt-3">
                Ver detalles de la tribu →
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default HomePage;