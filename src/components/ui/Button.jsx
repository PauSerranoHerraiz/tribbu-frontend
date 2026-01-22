export default function Button({
  children,
  variant = "primary",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-xl font-medium transition";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:bg-indigo-600",
    secondary:
      "bg-violet-400 text-white hover:bg-violet-500",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      className={`${base} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
