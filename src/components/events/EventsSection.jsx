import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import eventService from "../../services/event.service";
import EventList from "./EventList";

function EventsSection({ tribbuId, role }) {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const canEdit = role === "GUARDIÁN";

  useEffect(() => {
    if (!tribbuId) return;
    fetchEvents();
  }, [tribbuId]);

  const fetchEvents = () => {
    eventService
      .getEventsByTribbu(tribbuId)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  };

  const handleEventUpdated = (updatedEvent) => {
    fetchEvents(); // Recarga todos los eventos
  };

  const handleEventDeleted = (eventId) => {
    setEvents((prev) => prev.filter((e) => e._id !== eventId));
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">Eventos</h2>

      <div className="pt-4">
        <EventList 
          events={events} 
          onEventUpdated={handleEventUpdated}
          onEventDeleted={handleEventDeleted}
          canEdit={canEdit}
          tribbuId={tribbuId}
        />
      </div>
    </section>
  );
}

export default EventsSection;