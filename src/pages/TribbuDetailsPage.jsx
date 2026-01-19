import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddChild from "../components/AddChild";

function TribbuDetailsPage() {
  const { tribbuId } = useParams();
  const navigate = useNavigate();
  const [tribbu, setTribbu] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTribbu = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tribbus/${tribbuId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTribbu(response.data);
      setChildren(response.data.children || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching tribbu:", err);
      setError("No se pudo cargar la tribu");
      setTribbu(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTribbu();
  }, [tribbuId]);

  const handleChildAdded = async (newChild) => {
    await fetchTribbu();
  };

  if (loading)
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

  return (
    <div className="container mx-auto p-4 space-y-6">

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800">{tribbu.name}</h1>
        <p className="text-slate-600 mt-1">
          Miembros: <strong>{tribbu.members?.length || 0}</strong>
        </p>
      </div>
<div className="container mx-auto p-4 space-y-6 flex flex-col items-center">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <AddChild tribbuId={tribbu._id} onChildAdded={handleChildAdded} />
      </div>
</div>
      {/* Children List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Niños ({children.length})
        </h2>

        {children.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No hay niños todavía</p>
        ) : (
          <ul className="space-y-3">
            {children.map((child) => (
              <li
                key={child._id}
                className="border border-slate-200 rounded-md p-3 bg-slate-50"
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TribbuDetailsPage;
