import EventCard from "./EventCard";

function EventList({ events }) {
  if (!events || events.length === 0)
    return (
      <p className="text-slate-500 italic text-center py-4">
        No hay eventos
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
