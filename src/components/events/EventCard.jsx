function EventCard({ event }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-2 hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-slate-800">{event.title}</h3>
      {event.description && (
        <p className="text-sm text-slate-600">{event.description}</p>
      )}
      {event.childId && (
        <p className="text-xs font-medium text-indigo-600">
           {event.childId.name}
        </p>
      )}
      <p className="text-xs text-slate-500">
        {new Date(event.start).toLocaleString()}
      </p>
    </div>
  );
}

export default EventCard;