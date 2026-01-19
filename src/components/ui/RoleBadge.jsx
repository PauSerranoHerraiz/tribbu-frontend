const roles = {
  guardian: "bg-indigo-100 text-indigo-700",
  protector: "bg-emerald-100 text-emerald-700",
  sabio: "bg-violet-100 text-violet-700",
  cachorro: "bg-amber-100 text-amber-700",
};

export default function RoleBadge({ role }) {
  return (
    <span
      className={`px-3 py-1 text-sm rounded-full font-medium ${roles[role]}`}
    >
      {role}
    </span>
  );
}
