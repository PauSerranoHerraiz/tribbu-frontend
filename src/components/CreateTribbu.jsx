import { useState } from "react";
import tribbusService from "../services/tribbu.service";

function CreateTribbu({ refreshTribbus }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    tribbusService
      .createTribbu({ name })
      .then(() => {
        setName("");
        refreshTribbus();
      })
      .catch((error) => console.log(error));
  };

  return (

    <div className="container mx-auto p-4 space-y-6 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">

        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Crear nueva Tribbu
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Nombre de la Tribbu
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tribbu Name"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600
                     text-white font-medium py-2 rounded-md transition"
          >
            Crear Tribbu
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateTribbu;
