function CalendarToolbar({ label, onNavigate, onView, view }) {
  return (
    <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex justify-between sm:gap-2">
        <button onClick={() => onNavigate("PREV")} className="btn btn-sm">
          ◀
        </button>
        <button onClick={() => onNavigate("TODAY")} className="btn btn-sm">
          Hoy
        </button>
        <button onClick={() => onNavigate("NEXT")} className="btn btn-sm">
          ▶
        </button>
      </div>

      <div className="text-center font-semibold text-slate-700">
        {label}
      </div>

      <div className="flex justify-center gap-1">
        {["month", "week", "day"].map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={`btn btn-xs sm:btn-sm ${
              view === v ? "btn-primary" : "btn-ghost"
            }`}
          >
            {v === "month" ? "Mes" : v === "week" ? "Semana" : "Día"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CalendarToolbar;
