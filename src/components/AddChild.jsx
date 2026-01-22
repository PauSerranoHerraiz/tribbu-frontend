import { useState } from "react";
import childService from "../services/child.service";
import toast from "react-hot-toast";

function AddChild({ tribbuId, onChildAdded }) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await childService.createChild({
        name,
        birthDate,
        notes,
        tribbuId,
      });

      setName("");
      setBirthDate("");
      setNotes("");

      toast.success("Has añadido un cachorro a tu Tribbu!");
      onChildAdded?.(response.data);
    } catch (err) {
      const msg = err.response?.data?.error || "No se pudo crear el cachorro";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-md">

      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Añadir cachorro
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            placeholder="Nombre del cachorro"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Notas
          </label>
          <textarea
            value={notes}
            placeholder="Comentarios sobre el cachorro"
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-xl font-medium transition
            ${loading
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
        >
          {loading ? "Creando..." : "Crear cachorro"}
        </button>

      </form>
    </div>
  );
}

export default AddChild;
