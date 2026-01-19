import RoleBadge from "./ui/RoleBadge";

export default function Navbar({ username = "Usuario", role = "cachorro" }) {
  return (
    <nav className="flex justify-between items-center bg-indigo-500 text-white p-4 shadow-md rounded-b-lg">
      <h1 className="text-lg font-bold">Tribbu</h1>
      <div className="flex items-center gap-4">
        <span>{username}</span>
        <RoleBadge role={role} />
      </div>
    </nav>
  );
}