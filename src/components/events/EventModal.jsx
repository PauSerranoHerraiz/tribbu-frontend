import { useState, useEffect } from "react";
import moment from "moment";
import eventService from "../../services/event.service";
import childService from "../../services/child.service";
import tribbuService from "../../services/tribbu.service";

function EventModal({ event, slotInfo, tribbuId, canEdit, onClose, onEventUpdated, onEventDeleted }) {
  const isNewEvent = !event;
  const eventTribbuId = event?.tribbuId?._id || event?.tribbuId || tribbuId;
  
  const [title, setTitle] = useState(event?.title || "");
  const [start, setStart] = useState(
    event?.start
      ? moment(event.start).format("YYYY-MM-DDTHH:mm")
      : slotInfo?.start
        ? moment(slotInfo.start).format("YYYY-MM-DDTHH:mm")
        : ""
  );
  const [end, setEnd] = useState(
    event?.end
      ? moment(event.end).format("YYYY-MM-DDTHH:mm")
      : slotInfo?.end
        ? moment(slotInfo.end).format("YYYY-MM-DDTHH:mm")
        : ""
  );
  const [childId, setChildId] = useState(event?.childId?._id || "");
  const [responsibles, setResponsibles] = useState(
    event?.responsibles?.map((r) => r._id || r) || []
  );
  const [completed, setCompleted] = useState(event?.completed || false);
  const [children, setChildren] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [checklistItems, setChecklistItems] = useState(event?.checklistItems || []);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  useEffect(() => {
    if (!eventTribbuId) return;

    childService
      .getChildrenByTribbu(eventTribbuId)
      .then((res) => setChildren(res.data))
      .catch((err) => console.log(err));

    tribbuService
      .getTribbu(eventTribbuId)
      .then((res) => setMembers(res.data.members || []))
      .catch((err) => console.log(err));
  }, [eventTribbuId]);

  const handleResponsibleToggle = (userId) => {
    setResponsibles((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddChecklistItem = () => {
    const text = newChecklistItem.trim();
    if (!text) return;
    setChecklistItems((prev) => [...prev, { text, completed: false }]);
    setNewChecklistItem("");
  };

  const toggleChecklistItem = (index) => {
    setChecklistItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      start,
      end,
      tribbuId: eventTribbuId,
      childId: childId || null,
      responsibles,
      completed,
      checklistItems: checklistItems || [],
    };

    try {
      if (isNewEvent) {
        const res = await eventService.createEvent(payload);
        onEventUpdated?.(res.data);
      } else {
        const res = await eventService.updateEvent(event._id, payload);
        onEventUpdated?.(res.data);
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el evento");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este evento?")) return;
    setLoading(true);
    setError(null);

    try {
      await eventService.deleteEvent(event._id);
      onEventDeleted?.(event._id);
      onClose();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el evento");
    } finally {
      setLoading(false);
    }
  };

  const canEditThisEvent = canEdit || (event && !isNewEvent);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between sticky top-0 bg-white pb-2">
          <h3 className="text-xl font-semibold text-slate-800">
            {isNewEvent ? "Crear evento" : canEditThisEvent ? "Editar evento" : "Detalles del evento"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}

        {!canEditThisEvent && event ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-slate-700">Título</p>
              <p className="text-slate-900">{event.title}</p>
            </div>
            
            {event.childId && (
              <div>
                <p className="text-sm font-medium text-slate-700">Cachorro</p>
                <p className="text-slate-900">🐶 {event.childId.name}</p>
              </div>
            )}

            {event.tribbuName && (
              <div>
                <p className="text-sm font-medium text-slate-700">Tribbu</p>
                <p className="text-slate-900">{event.tribbuName}</p>
              </div>
            )}

            {event.responsibles && event.responsibles.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700 mb-1">Responsables</p>
                <div className="flex flex-wrap gap-1">
                  {event.responsibles.map((resp) => (
                    <span
                      key={resp._id}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                    >
                      {resp.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-slate-700">Inicio</p>
              <p className="text-slate-900">{moment(event.start).format("DD/MM/YYYY HH:mm")}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">Fin</p>
              <p className="text-slate-900">{moment(event.end).format("DD/MM/YYYY HH:mm")}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-700">Estado</p>
              <p className={`font-medium ${event.completed ? "text-green-600" : "text-amber-600"}`}>
                {event.completed ? "✓ Completado" : "⏳ Pendiente"}
              </p>
            </div>

            {event.checklistItems && event.checklistItems.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700">Checklist</p>
                <ul className="mt-1 space-y-1">
                  {event.checklistItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={item.completed} readOnly className="rounded text-indigo-600" />
                      <span className={item.completed ? "line-through text-slate-400" : "text-slate-800"}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 rounded-md transition"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700">Título</label>
              <input
                className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Título del evento"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700">Cachorro (opcional)</label>
              <select
                className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={childId}
                onChange={(e) => setChildId(e.target.value)}
              >
                <option value="">Selecciona un cachorro...</option>
                {children.map((child) => (
                  <option key={child._id} value={child._id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700">Responsables (opcional)</label>
              <div className="border border-slate-300 rounded-md p-3 space-y-2 max-h-32 overflow-y-auto bg-white">
                {members.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">No hay miembros disponibles</p>
                ) : (
                  members.map((member) => {
                    const userId = member.userId._id || member.userId;
                    return (
                      <label
                        key={userId}
                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={responsibles.includes(userId)}
                          onChange={() => handleResponsibleToggle(userId)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-slate-700">{member.userId.name}</span>
                        <span className="text-xs text-slate-500">({member.role})</span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700">Inicio</label>
              <input
                type="datetime-local"
                className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700">Fin</label>
              <input
                type="datetime-local"
                className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
              />
            </div>

            {!isNewEvent && (
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                <input
                  type="checkbox"
                  id="completed"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
                />
                <label htmlFor="completed" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Marcar como completado
                </label>
              </div>
            )}

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-slate-700">Checklist (opcional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  placeholder="Añadir ítem"
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddChecklistItem}
                  className="px-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md"
                >
                  Añadir
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {checklistItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                    onClick={() => toggleChecklistItem(index)}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      readOnly
                      className="rounded text-indigo-600"
                    />
                    <span className={item.completed ? "line-through text-slate-400" : "text-slate-700"}>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition disabled:opacity-50"
              >
                {loading ? "Guardando..." : isNewEvent ? "Crear" : "Guardar"}
              </button>

              {!isNewEvent && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition disabled:opacity-50"
                >
                  Eliminar
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 rounded-md transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EventModal;