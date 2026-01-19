function EventCard({ event }) {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <small>{new Date(event.date).toLocaleDateString()}</small>
    </div>
  );
}

export default EventCard;
