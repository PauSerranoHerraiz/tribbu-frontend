import EventCard from "./EventCard";

function EventList({ events }) {
  if (!events.length) return <p>No hay eventos</p>;

  return (
    <div>
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
