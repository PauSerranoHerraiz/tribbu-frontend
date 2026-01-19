const roles = {
  guardian: "bg-indigo-100 text-indigo-700",
  protector: "bg-emerald-100 text-emerald-700",
  sabio: "bg-violet-100 text-violet-700",
  cachorro: "bg-amber-100 text-amber-700",
};

const fallbackClass = "bg-gray-100 text-gray-700";

function RoleBadge({ role }) {
  const cls = roles[role] ?? fallbackClass;
  return (
    <span className={`px-3 py-1 text-sm rounded-full font-medium ${cls}`}>
      {role}
    </span>
  );
}

export default RoleBadge