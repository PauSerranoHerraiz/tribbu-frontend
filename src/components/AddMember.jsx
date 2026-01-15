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
      userService.searchUsers(value)
        .then((response) => setUsers(response.data))
        .catch((error) => console.log(error));
    } else {
      setUsers([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tribbusService.addMemberToTribbu(tribbuId, selectedUserId, role)
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
    <form onSubmit={handleSubmit}>
      <label>Buscar usuario (nombre o email):</label>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Introduce nombre o email"
      />
      {users.length > 0 && (
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      )}

      <label>Rol:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="GUARDIÁN">GUARDIÁN</option>
        <option value="PROTECTOR">PROTECTOR</option>
        <option value="SABIO">SABIO</option>
        <option value="CACHORRO">CACHORRO</option>
      </select>

      <button type="submit" disabled={!selectedUserId}>Añadir miembro</button>
    </form>
  );
}

export default AddMember;