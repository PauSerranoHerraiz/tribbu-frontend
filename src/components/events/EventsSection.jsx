import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import eventService from "../../services/event.service";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";

function EventsSection({ tribbuId, role }) {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!tribbuId) return;
    eventService
      .getEventsByTribbu(tribbuId)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, [tribbuId]);

  const handleEventCreated = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">Eventos</h2>

      {role === "GUARDIÁN" && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          {/* Aquí pasamos tribbuId */}
          <CreateEvent onEventCreated={handleEventCreated} tribbuId={tribbuId} />
        </div>
      )}

      <div className="pt-4">
        <EventList events={events} />
      </div>
    </section>
  );
}

export default EventsSection;