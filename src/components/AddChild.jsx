import { useState } from "react";
import childService from "../services/child.service";

function AddChild({ tribbuId, onChildAdded }) {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await childService.createChild({
                name,
                birthDate,
                notes,
                tribbuId: tribbuId,
            });

            setName("");
            setBirthDate("");
            setNotes("");

            if (onChildAdded) {
                onChildAdded(response.data);
            }
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            setError(err.response?.data?.error || "No se pudo crear el niño");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-child">
            <h3>Añadir niño</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Nombre del cachorro"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Fecha de nacimiento</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Notas</label>
                    <textarea
                        value={notes}
                        placeholder="Comentarios sobre el cachorro"
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Creando..." : "Crear cachorro"}
                </button>
            </form>
        </div>
    );
}

export default AddChild;