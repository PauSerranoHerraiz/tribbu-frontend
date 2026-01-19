import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import EventList from "./EventList";
import tribbuService from "../../services/tribbu.service";
import eventService from "../../services/event.service";

function EventsPage() {
  const { user } = useContext(AuthContext);
  const [allEvents, setAllEvents] = useState([]);
  const [tribbus, setTribbus] = useState([]);
  const [selectedTribbuId, setSelectedTribbuId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllEvents = async () => {
    try {
      setLoading(true);

      const tribbuResponse = await tribbuService.getUserTribbus();
      const userTribbus = tribbuResponse.data;
      setTribbus(userTribbus);

      const eventPromises = userTribbus.map((tribbu) =>
        eventService
          .getEventsByTribbu(tribbu._id)
          .then((res) => 
            res.data.map((event) => ({
              ...event,
              tribbuName: tribbu.name,
            }))
          )
          .catch(() => [])
      );

      const eventArrays = await Promise.all(eventPromises);
      const flattenedEvents = eventArrays.flat();

      setAllEvents(flattenedEvents);
    } catch (err) {
      console.error(err);
      setAllEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleEventUpdated = () => {
    fetchAllEvents();
  };

  const handleEventDeleted = (eventId) => {
    setAllEvents((prev) => prev.filter((e) => e._id !== eventId));
  };

  const canUserEdit = (tribbuId) => {
    if (!tribbuId) return false;
    const tribbu = tribbus.find(t => t._id === tribbuId);
    if (!tribbu) return false;
    
    const member = tribbu.members?.find(m => 
      String(m.userId._id || m.userId) === String(user._id)
    );
    return member?.role === "GUARDIÁN" || member?.role === "PROTECTOR";
  };

  const guardianTribbus = tribbus.filter(t => {
    const member = t.members?.find(m => 
      String(m.userId._id || m.userId) === String(user._id)
    );
    return member?.role === "GUARDIÁN";
  });

  const canEdit = guardianTribbus.length > 0;
  const defaultTribbuId = canEdit ? guardianTribbus[0]._id : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando eventos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Mis Eventos</h1>
        <p className="text-slate-600 mt-2">
          {allEvents.length === 0
            ? "No tienes eventos próximos"
            : `${allEvents.length} evento${allEvents.length !== 1 ? "s" : ""} en total`}
        </p>

        {canEdit && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-700 mb-2">
              <strong>Consejo:</strong> Haz click en el calendario para crear un evento
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-indigo-700">
                Crear evento en:
              </label>
              <select
                value={selectedTribbuId || defaultTribbuId}
                onChange={(e) => setSelectedTribbuId(e.target.value)}
                className="text-sm border border-indigo-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {guardianTribbus.map((tribbu) => (
                  <option key={tribbu._id} value={tribbu._id}>
                    {tribbu.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <EventList 
        events={allEvents}
        onEventUpdated={handleEventUpdated}
        onEventDeleted={handleEventDeleted}
        canEdit={canEdit}
        tribbuId={selectedTribbuId || defaultTribbuId}
      />
    </div>
  );
}

export default EventsPage;