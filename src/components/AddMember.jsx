import { useState } from "react";
import tribbusService from "../services/tribbu.service";
import userService from "../services/user.service";

function AddMember({ tribbuId, onMemberAdded }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState("SABIO");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 2) {
      userService
        .searchUsers(value)
        .then((response) => setUsers(response.data))
        .catch((error) => console.log(error));
    } else {
      setUsers([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    tribbusService
      .addMemberToTribbu(tribbuId, selectedUserId, role)
      .then(() => {
        setSearch("");
        setUsers([]);
        setSelectedUserId("");
        setRole("SABIO");
        onMemberAdded();
      })
      .catch((error) => console.log(error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4"
    >

      <h4 className="text-sm font-semibold text-slate-700">
        Añadir miembro
      </h4>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Buscar usuario
        </label>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Nombre o email"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {users.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Usuario encontrado
          </label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Selecciona un usuario</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Rol en la Tribbu
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="GUARDIÁN">GUARDIÁN</option>
          <option value="PROTECTOR">PROTECTOR</option>
          <option value="SABIO">SABIO</option>
          <option value="CACHORRO">CACHORRO</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!selectedUserId}
        className={`w-full py-2 rounded-md font-medium transition
          ${
            selectedUserId
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
      >
        Añadir miembro
      </button>
    </form>
  );
}

export default AddMember;
