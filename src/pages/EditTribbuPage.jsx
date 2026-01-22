import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import tribbusService from "../services/tribbu.service";
import AddMember from "../components/AddMember";
import toast from "react-hot-toast";

function EditTribbusPage() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();
  const { tribbuId } = useParams();

  useEffect(() => {
    tribbusService.getTribbu(tribbuId)
      .then((response) => {
        const oneTribbu = response.data;
        setName(oneTribbu.name);
        setMembers(oneTribbu.members);
      })
      .catch((error) => console.log(error));
  }, [tribbuId]);

  const refreshMembers = () => {
    tribbusService.getTribbu(tribbuId)
      .then((response) => setMembers(response.data.members || []))
      .catch((error) => console.log(error));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    if (field === "role") updatedMembers[index].role = value;
    setMembers(updatedMembers);
  };

 const handleFormSubmit = (e) => {
    e.preventDefault();
    tribbusService.updateTribbu(tribbuId, { name, members })
      .then(() => {
        toast.success("Tribbu actualizada correctamente");
        navigate(`/tribbus`);
      })
      .catch((err) => {
        toast.error("No se pudo actualizar la Tribbu");
        console.log(err);
      });
  };

  const deleteTribbu = () => {
  toast((t) => (
    <div className="flex gap-2">
      <div>
        <p className="font-medium mb-2">¿Eliminar la Tribbu "{name}"?</p>
        <p className="text-sm text-slate-600">Esta acción no se puede deshacer.</p>
      </div>
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="btn btn-sm btn-ghost"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            tribbusService.deleteTribbu(tribbuId)
              .then(() => {
                toast.success("Tribbu eliminada correctamente");
                navigate("/tribbus");
              })
              .catch((err) => {
                toast.error("No se pudo eliminar la Tribbu");
                console.log(err);
              });
          }}
          className="btn btn-sm btn-error"
        >
          Eliminar
        </button>
      </div>
    </div>
  ), { duration: Infinity });
};
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Editar Tribbu
          </h3>

          <AddMember tribbuId={tribbuId} onMemberAdded={refreshMembers} />

          <form onSubmit={handleFormSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Nombre de la Tribbu
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Miembros
              </label>

              {members && members.length > 0 ? (
                <div className="space-y-3">
                  {members.map((member, index) => (
                    <div
                      key={member.userId._id}
                      className="flex items-center justify-between p-2 border border-slate-200 rounded-md"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {member.userId.name}
                      </span>

                      <select
                        value={member.role}
                        onChange={(e) =>
                          handleMemberChange(index, "role", e.target.value)
                        }
                        className="rounded-md border border-slate-300 px-2 py-1 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="GUARDIÁN">GUARDIÁN</option>
                        <option value="PROTECTOR">PROTECTOR</option>
                        <option value="SABIO">SABIO</option>
                        <option value="CACHORRO">CACHORRO</option>
                      </select>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-slate-500">Aún no hay miembros</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition"
              >
                Actualizar Tribbu
              </button>

              <button
                type="button"
                onClick={deleteTribbu}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition"
              >
                Eliminar Tribbu
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default EditTribbusPage;
