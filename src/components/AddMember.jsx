import { useState } from "react";
import tribbusService from "../services/tribbu.service";
import toast from "react-hot-toast";

function AddMember({ tribbuId, onMemberAdded }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("SABIO");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    tribbusService
      .inviteMemberToTribbu(tribbuId, { email, role })
      .then(() => {
        toast.success(`Has ivitado a ${email} a tu Tribbu!`);
        setSuccess(`Invitación enviada a ${email}`);
        setEmail("");
        setRole("SABIO");
        setTimeout(() => {
          setSuccess(null);
          onMemberAdded?.();
        }, 2000);
      })
      .catch((err) => {
        const message = 
          err.response?.data?.message || 
          "No se pudo enviar la invitación a tu Tribbu...";
        setError(message);
        toast.error(message)
      })
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4"
    >
      <h4 className="text-sm font-semibold text-slate-700">
        Invitar miembro por email
      </h4>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">✓ {success}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Email del usuario
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@example.com"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <p className="text-xs text-slate-500 mt-1">
          Se enviará una invitación a cualquier email. Si la persona no está registrada, recibirá un link para registrarse.
        </p>
      </div>

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
        disabled={!email || loading}
        className={`w-full py-2 rounded-md font-medium transition
          ${
            email && !loading
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
      >
        {loading ? "Enviando invitación..." : "Enviar invitación"}
      </button>
    </form>
  );
}

export default AddMember;