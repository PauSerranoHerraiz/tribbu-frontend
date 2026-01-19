import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";
import eventService from "../../services/event.service";

function EventsSection({ tribbuId, role }) {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService
      .getEventsByTribbu(tribbuId)
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, [tribbuId]);

  return (
    <section>
      <h2>Eventos</h2>

      {role === "GUARDIÁN" && (
        <CreateEvent onEventCreated={event => setEvents([event, ...events])} />
      )}

      <EventList events={events} />
    </section>
  );
}

export default EventsSection;