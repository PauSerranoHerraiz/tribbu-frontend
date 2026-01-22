import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tribbusService from "../services/tribbu.service";
import toast from "react-hot-toast";

function CreateTribbu({ refreshTribbus }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    tribbusService
      .createTribbu({ name })
      .then(() => {
        toast.success("Felicidades, has creado tu Tribbu!")
        setName("");
        refreshTribbus?.();
        navigate("/tribbus");
      })
      .catch((error) => {
        console.log(error);
        const msg =
          error?.response?.data?.message || "Algo ha ocurrido y no se ha credo tu Tribbu... Vuelve a intentarlo!!";
        toast.error(msg); // <-- error
      });
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
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-xl transition"
          >
            Crear Tribbu
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTribbu;