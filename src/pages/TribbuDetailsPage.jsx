import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import AddChild from "../components/AddChild";
import AddMember from "../components/AddMember";
import EventsSection from "../components/events/EventsSection";
import toast from "react-hot-toast";

function TribbuDetailsPage() {
  const { tribbuId } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useContext(AuthContext);

  const [tribbu, setTribbu] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  const fetchTribbu = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tribbus/${tribbuId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTribbu(res.data);
      setChildren(res.data.children || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la tribu");
      setTribbu(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTribbu();
  }, [tribbuId]);

  const handleChildAdded = async () => {
    await fetchTribbu();
    setShowAddChild(false);
  };

  const handleDeleteChild = async (childId) => {
    toast((t) => (
      <div className="flex gap-3">
        <div>
          <p className="font-medium mb-2">¿Eliminar este cachorro?</p>
          <p className="text-xs text-slate-500">Esta acción no se puede deshacer.</p>
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-sm btn-ghost"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              axios.delete(
                `${import.meta.env.VITE_API_URL}/api/children/${childId}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
              )
                .then(() => {
                  toast.success("Cachorro eliminado");
                  fetchTribbu();
                })
                .catch(() => {
                  toast.error("No se pudo eliminar el cachorro");
                });
            }}
            className="btn btn-sm btn-error"
          >
            Eliminar
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleMemberAdded = async () => {
    await fetchTribbu();
    setShowAddMember(false);
  };

  const handleDeleteMember = async (memberId) => {
    toast((t) => (
      <div className="flex gap-3">
        <div>
          <p className="font-medium mb-2">¿Eliminar este miembro?</p>
          <p className="text-xs text-slate-500">Esta acción no se puede deshacer.</p>
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-sm btn-ghost"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              axios.delete(
                `${import.meta.env.VITE_API_URL}/api/tribbus/${tribbuId}/members/${memberId}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
              )
                .then(() => {
                  toast.success("Miembro eliminado");
                  fetchTribbu();
                })
                .catch(() => {
                  toast.error("No se pudo eliminar el miembro");
                });
            }}
            className="btn btn-sm btn-error"
          >
            Eliminar
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  if (authLoading || loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando tribu...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  if (!tribbu)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Tribu no encontrada</p>
      </div>
    );

  const members = tribbu.members || [];
  const userMember = members.find(
    (m) => String(m.userId?._id || m.userId) === String(user?._id)
  );
  const role = userMember?.role || "SABIO";
  const isGuardian = role === "GUARDIÁN";

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{tribbu.name}</h1>
          <p className="text-slate-600 mt-1">
            Miembros: <strong>{members.length}</strong> · Tu rol:{" "}
            <strong className="text-indigo-600">{role}</strong>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/tribbus"
            className="text-sm text-indigo-50 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl transition"
          >
            Volver a Tribbus
          </Link>
          {isGuardian && (
            <Link
              to={`/tribbus/edit/${tribbu._id}`}
              className="text-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-xl transition"
            >
              Editar Tribbu
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        <a
          href="#events"
          className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
        >
          Crear/Ver eventos
        </a>
        <a
          href="#members"
          className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
        >
          Ver miembros
        </a>
        <a
          href="#children"
          className="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
        >
          Ver cachorros
        </a>
        {isGuardian && (
          <>
            <button
              onClick={() => setShowAddMember((v) => !v)}
              className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
            >
              {showAddMember ? "Cerrar" : "Añadir miembro"}
            </button>
            <button
              onClick={() => setShowAddChild((v) => !v)}
              className="px-3 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition"
            >
              {showAddChild ? "Cerrar" : "Añadir cachorro"}
            </button>
          </>
        )}
      </div>

      <div
        id="events"
        className="bg-white border border-slate-200 rounded-2xl shadow-md p-6"
      >
        <EventsSection tribbuId={tribbu._id} role={role} />
      </div>

      <div
        id="members"
        className="bg-white border border-slate-200 rounded-2xl shadow-md p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Miembros</h2>
          {isGuardian && (
            <button
              onClick={() => setShowAddMember((v) => !v)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {showAddMember ? "Cerrar" : "Añadir miembro"}
            </button>
          )}
        </div>

        {isGuardian && showAddMember && (
          <div className="mb-4">
            <AddMember tribbuId={tribbu._id} onMemberAdded={handleMemberAdded} />
          </div>
        )}

        {members.length === 0 ? (
          <p className="text-sm italic text-slate-500">No hay miembros</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {members.map((member) => (
              <li
                key={member.userId._id}
                className="flex flex-col items-start p-4 border border-slate-200 rounded-xl bg-slate-50 shadow-sm"
              >
                <p className="font-medium text-slate-700">{member.userId.name}</p>
                <p className="text-xs text-slate-500">{member.userId.email}</p>
                <span className="mt-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {member.role}
                </span>
                {isGuardian && (
                  <button
                    onClick={() => handleDeleteMember(member.userId._id)}
                    className="mt-3 text-xs bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1 rounded transition"
                  >
                    Eliminar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        id="children"
        className="bg-white border border-slate-200 rounded-2xl shadow-md p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Cachorros ({children.length})
          </h2>
          {isGuardian && (
            <button
              onClick={() => setShowAddChild((v) => !v)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {showAddChild ? "Cerrar" : "Añadir cachorro"}
            </button>
          )}
        </div>

        {isGuardian && showAddChild && (
          <div className="mb-4">
            <AddChild tribbuId={tribbu._id} onChildAdded={handleChildAdded} />
          </div>
        )}

        {children.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No hay cachorros aún</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {children.map((child) => (
              <li
                key={child._id}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50 shadow-sm"
              >
                <p className="font-medium text-slate-700">{child.name}</p>
                <p className="text-sm text-slate-600">
                  Nacimiento:{" "}
                  {child.birthDate
                    ? new Date(child.birthDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-slate-600">
                  Notas: {child.notes || "Sin notas"}
                </p>
                {isGuardian && (
                  <button
                    onClick={() => handleDeleteChild(child._id)}
                    className="mt-3 text-xs bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1 rounded transition"
                  >
                    Eliminar
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TribbuDetailsPage;