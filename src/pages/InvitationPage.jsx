import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function InvitationPage() {
  const { invitationId } = useParams();
  const navigate = useNavigate();

  const [loadingInvitation, setLoadingInvitation] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invitation, setInvitation] = useState(null);

  // Leer token una sola vez
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/invitations/${invitationId}`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
        setInvitation(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Invitación no encontrada o expirada"
        );
      } finally {
        setLoadingInvitation(false);
      }
    };

    fetchInvitation();
  }, [invitationId, token]);

  const handleAction = async (type) => {
    if (!token) {
      navigate(`/login?redirect=/invitations/${invitationId}`);
      return;
    }

    setActionLoading(true);
    setError(null);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/invitations/${invitationId}/${type}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || `Error al ${type} la invitación`);
      setActionLoading(false);
    }
  };

  if (loadingInvitation)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando invitación...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 max-w-md text-center space-y-4">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="bg-white border border-slate-200 rounded-xl shadow-md p-8 max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-800">¡Te han invitado!</h1>
          <p className="text-slate-600">Has sido invitado a unirte a</p>
          <p className="text-xl font-semibold text-indigo-600">
            {invitation?.tribbuId?.name}
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
          <p className="text-sm text-slate-600">
            <strong>Tu rol:</strong> {invitation?.role}
          </p>
          <p className="text-sm text-slate-600">
            <strong>Invitado por:</strong> {invitation?.invitedBy?.name}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleAction("accept")}
            disabled={actionLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition disabled:opacity-50"
          >
            {actionLoading ? "Procesando..." : "Aceptar invitación"}
          </button>
          <button
            onClick={() => handleAction("decline")}
            disabled={actionLoading}
            className="w-full bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium py-2 rounded-md transition disabled:opacity-50"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvitationPage;