import { Link } from "react-router-dom";
import { demoTribbu } from "../data/demoData";

function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <div className="bg-violet-100 text-violet-700 text-sm text-center py-2">
        Estás viendo una demo de Tribbu
      </div>

      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-indigo-600">
          Tribbu · {demoTribbu.name}
        </h1>
        <Link
          to="/signup"
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition"
        >
          Crear mi Tribbu
        </Link>
      </header>

      <main className="px-6 grid gap-6 max-w-4xl mx-auto">

        <section className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold mb-2">📅 Próximo evento</h2>
          <p className="text-lg">{demoTribbu.events[0].title}</p>
          <p className="text-sm text-slate-500">{demoTribbu.events[0].date}</p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold mb-4">👥 Miembros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {demoTribbu.members.map((member) => (
              <div
                key={member.name}
                className="bg-slate-100 rounded-xl p-3 text-center text-sm"
              >
                <p className="font-medium">{member.name}</p>
                <p className="text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold mb-2">📝 Nota</h2>
          <p>{demoTribbu.note}</p>
        </section>

        <button
          onClick={() => alert("Crea tu Tribbu para empezar")}
          className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl py-3 hover:bg-indigo-50 transition"
        >
          + Añadir evento
        </button>
      </main>
    </div>
  );
}

export default DemoPage;
