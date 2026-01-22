import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import childService from "../../services/child.service";
import eventService from "../../services/event.service";

function CreateEvent({ onEventCreated, tribbuId }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [childId, setChildId] = useState("");
  const [children, setChildren] = useState([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tribbuId) return; 
    setLoadingChildren(true);
    childService
      .getChildrenByTribbu(tribbuId)
      .then((res) => setChildren(res.data))
      .catch((err) => {
        console.log(err);
        setError("No se pudieron cargar los cachorros");
      })
      .finally(() => setLoadingChildren(false));
  }, [tribbuId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      title,
      start,
      end,
      tribbuId,
      childId: childId || null,
    };

    eventService
      .createEvent(payload)
      .then((res) => {
        onEventCreated?.(res.data);
        setTitle("");
        setStart("");
        setEnd("");
        setChildId("");
      })
      .catch((err) => {
        console.log(err);
        setError("No se pudo crear el evento");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4 max-w-md mx-auto"
    >
      <h3 className="text-lg font-semibold text-slate-800">Crear evento</h3>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-slate-700">Título</label>
        <input
          className="border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-slate-700">Cachorro (opcional)</label>
        <select
          className="border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={childId}
          onChange={(e) => setChildId(e.target.value)}
          disabled={loadingChildren || !tribbuId}
        >
          <option value="">{loadingChildren ? "Cargando..." : "Selecciona un cachorro..."}</option>
          {children.map((child) => (
            <option key={child._id} value={child._id}>
              {child.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-slate-700">Inicio</label>
        <input
          type="datetime-local"
          className="border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-slate-700">Fin</label>
        <input
          type="datetime-local"
          className="border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-xl transition"
        disabled={!tribbuId}
      >
        Crear
      </button>
    </form>
  );
}

export default CreateEvent;