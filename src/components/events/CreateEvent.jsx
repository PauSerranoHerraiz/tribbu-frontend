import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import eventService from "../../services/event.service";

function CreateEvent({ onEventCreated }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    eventService
      .createEvent({
        title,
        start,
        end,
        tribbuId: user.tribbuId._id
      })
      .then(res => {
        onEventCreated(res.data);
        setTitle("");
        setStart("");
        setEnd("");
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear evento</h3>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <label>Inicio:</label>
      <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
      <label>Fin:</label>
      <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
      <button type="submit">Crear</button>
    </form>
  );
}

export default CreateEvent;