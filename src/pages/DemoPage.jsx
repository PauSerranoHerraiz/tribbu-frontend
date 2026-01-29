import { Link } from "react-router-dom";
import { demoTribbu } from "../data/demoData";

function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">

      <section className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Organiza planes en grupo sin estrés
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-light">
          ¿Cansado de mensajes perdidos, decisiones confusas y planes sin coordinar? 
          <span className="block font-semibold mt-3">Tribbu es tu espacio único donde todo tu grupo decide y actúa juntos.</span>
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl hover:shadow-2xl"
        >
          Empezar gratis →
        </Link>
      </section>

   

      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">En 4 pasos sencillos:</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition">
            <div className="text-5xl mb-4">1️⃣</div>
            <h3 className="font-bold text-lg mb-2">Crea tu Tribbu</h3>
            <p className="text-gray-600">Para tu familia, oficina, asociación...</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-violet-500 hover:shadow-lg transition">
            <div className="text-5xl mb-4">2️⃣</div>
            <h3 className="font-bold text-lg mb-2">Invita miembros</h3>
            <p className="text-gray-600">Por e-mail</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-purple-500 hover:shadow-lg transition">
            <div className="text-5xl mb-4">3️⃣</div>
            <h3 className="font-bold text-lg mb-2">Crea eventos</h3>
            <p className="text-gray-600">Define fechas, asigna responsables, tareas asociadas...</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-pink-500 hover:shadow-lg transition">
            <div className="text-5xl mb-4">4️⃣</div>
            <h3 className="font-bold text-lg mb-2">¡A disfrutar!</h3>
            <p className="text-gray-600">Sin estrés, todo confirmado y claro</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Así se ve tu Tribbu:</h2>
        <main className="grid gap-6 mb-8">
          <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="font-semibold mb-3 text-lg">📅 Próximo evento</h3>
            <p className="text-lg font-medium text-gray-800">{demoTribbu.events[0].title}</p>
            <p className="text-sm text-slate-500 mt-1">{demoTribbu.events[0].date}</p>
          </section>

          <section className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="font-semibold mb-4 text-lg">👥 Miembros confirmados</h3>
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
            <h3 className="font-semibold mb-3 text-lg">📝 Notas importantes</h3>
            <p className="text-gray-700 leading-relaxed">{demoTribbu.note}</p>
          </section>
        </main>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">¿Listo para organizar mejor?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Crea tu Tribbu ahora. Es gratis, toma 30 segundos y cambia cómo organizas planes.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition shadow-lg"
        >
          Crear mi primer Tribbu →
        </Link>
      </section>

    </div>
  );
}

export default DemoPage;