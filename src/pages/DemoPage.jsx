import { Link } from "react-router-dom";
import { demoTribbu } from "../data/demoData";

function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">

      <section className="bg-indigo-600 text-white py-20 px-6 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Organiza planes en grupo sin estrés
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Tribbu te ayuda a crear, coordinar y compartir planes con amigos, familia o tu comunidad de forma sencilla y divertida.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md"
        >
          Crear mi Tribbu
        </Link>
      </section>

      <section className="px-6 py-12 max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Cómo funciona Tribbu</h2>
        <div className="grid gap-4 md:grid-cols-2 text-left">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">1️⃣</span>
            <p className="text-gray-700 mt-2">Crea tu Tribbu para tu grupo</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">2️⃣</span>
            <p className="text-gray-700 mt-2">Invita a tus amigos</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">3️⃣</span>
            <p className="text-gray-700 mt-2">Comparte eventos y toma decisiones juntos</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">4️⃣</span>
            <p className="text-gray-700 mt-2">Mantén todo organizado en un solo lugar</p>
          </div>
        </div>
      </section>

      <main className="px-6 grid gap-6 max-w-4xl mx-auto mb-12">

        <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="font-semibold mb-3 text-lg">Próximo evento</h2>
          <p className="text-lg font-medium text-gray-800">{demoTribbu.events[0].title}</p>
          <p className="text-sm text-slate-500 mt-1">{demoTribbu.events[0].date}</p>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="font-semibold mb-4 text-lg">Miembros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {demoTribbu.members.map((member) => (
              <div
                key={member.name}
                className="bg-indigo-50 rounded-xl p-3 text-center text-sm hover:bg-indigo-100 transition cursor-pointer"
              >
                <p className="font-medium text-indigo-700">{member.name}</p>
                <p className="text-indigo-900 text-xs mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="font-semibold mb-3 text-lg">Notas de la Tribbu</h2>
          <p className="text-gray-700 leading-relaxed">{demoTribbu.note}</p>
        </section>

        <button
          onClick={() => alert("Crea tu Tribbu para empezar")}
          className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl py-4 hover:bg-indigo-50 hover:border-indigo-400 transition font-medium"
        >
          + Añadir evento
        </button>
      </main>

      <section className="px-6 py-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl max-w-4xl mx-auto text-center space-y-6 shadow-md">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">Por qué Tribbu</h3>
        <div className="grid gap-4 md:grid-cols-2 text-left max-w-2xl mx-auto">
          <div className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">✓</span>
            <p className="text-gray-700">Todo tu grupo en un solo lugar</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">✓</span>
            <p className="text-gray-700">Decisiones claras y visibles para todos</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">✓</span>
            <p className="text-gray-700">Diseñado para ser sencillo y cozy</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">✓</span>
            <p className="text-gray-700">Escalable desde 2 hasta muchos miembros</p>
          </div>
        </div>
      </section>

      <div className="mt-12 text-center pb-16">
        <Link
          to="/signup"
          className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
        >
          Crea tu Tribbu y empieza ahora!
        </Link>
      </div>

    </div>
  );
}

export default DemoPage;