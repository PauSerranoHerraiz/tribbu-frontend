import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EventsSection from "../components/events/EventsSection";

function HomePage() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [isLoading, user, navigate]);

  if (isLoading || !user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando...</p>
      </div>
    );

  const tribbu = user.tribbuId;

  if (!tribbu)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">
          No tienes una tribbu asignada aún.
        </p>
      </div>
    );

  const { name, _id, members } = tribbu;

  const userMember = members?.find(
    (member) => String(member.userId) === String(user._id)
  );
  const role = userMember?.role || "SABIO";

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center space-y-6">

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 w-full max-w-2xl text-center">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">{name}</h1>
        <p className="text-slate-600">
          Tu rol: <strong className="text-indigo-600">{role}</strong>
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <EventsSection tribbuId={_id} role={role} />
      </div>

      {role === "GUARDIÁN" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 w-full max-w-2xl">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Administración</h2>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition">
            Gestionar miembros
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
