import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import tribbuService from "../services/tribbu.service";
import eventService from "../services/event.service";
import moment from "moment";

function HomePage() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tribbus, setTribbus] = useState([]);
  const [loadingTribbus, setLoadingTribbus] = useState(false);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/demo");
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    setLoadingTribbus(true);
    tribbuService
      .getUserTribbus()
      .then((res) => setTribbus(res.data || []))
      .catch(() => setTribbus([]))
      .finally(() => setLoadingTribbus(false));
  }, [user]);

  useEffect(() => {
    if (!tribbus || tribbus.length === 0) return;
    
    setLoadingEvents(true);
    const eventPromises = tribbus.map((tribbu) =>
      eventService
        .getEventsByTribbu(tribbu._id)
        .then((res) =>
          res.data.map((event) => ({
            ...event,
            tribbuName: tribbu.name,
            tribbuId: tribbu._id,
          }))
        )
        .catch(() => [])
    );

    Promise.all(eventPromises)
      .then((eventArrays) => {
        const allEvents = eventArrays.flat();
        setEvents(allEvents);

        const pendingEvents = allEvents.filter((e) => !e.completed);
        const sorted = pendingEvents.sort(
          (a, b) => new Date(a.start) - new Date(b.start)
        );
        setNextEvent(sorted[0] || null);
      })
      .finally(() => setLoadingEvents(false));
  }, [tribbus]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando...</p>
      </div>
    );

  if (!user) return null;

  if (loadingTribbus)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-600 text-lg">Cargando tribbus...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-indigo-600">Bienvenido/a {user?.name}!</h1>
        <Link
          to="/events"
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition"
        >
          Ver todos los eventos
        </Link>
      </header>

      <main className="px-6 grid gap-6 max-w-4xl mx-auto pb-8">
        {!loadingEvents && nextEvent && (
          <section className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-indigo-600">
            <h2 className="text-sm font-semibold text-slate-500 uppercase mb-2">
              Próximo evento
            </h2>
            <Link
              to={`/tribbus/${nextEvent.tribbuId}`}
              className="block hover:opacity-75 transition"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {nextEvent.title}
              </h3>
              <p className="text-slate-600">
                <strong>{nextEvent.tribbuName}</strong> ·{" "}
                {moment(nextEvent.start).format("DD/MM/YYYY HH:mm")}
              </p>
              {nextEvent.childId && (
                <p className="text-sm text-indigo-600 mt-2">
                  {nextEvent.childId.name}
                </p>
              )}
              <p className="text-sm text-indigo-600 mt-3">
                Ver detalles →
              </p>
            </Link>
          </section>
        )}

        <section className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl shadow-md p-8 text-white text-center">
          <h2 className="text-xl font-semibold mb-2">Crear evento</h2>
          <p className="text-indigo-100 mb-4">
            Organiza actividades para tu Tribbu
          </p>
          <Link
            to="/events"
            className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition transform hover:scale-105"
          >
            + Ir al calendario
          </Link>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Mis Tribbus
          </h2>
          {tribbus.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tribbus.map((tribbu) => {
                const { name, _id, members = [] } = tribbu;
                const userMember = members.find(
                  (member) => String(member.userId?._id || member.userId) === String(user._id)
                );
                const role = userMember?.role || "SABIO";

                return (
                  <Link
                    key={_id}
                    to={`/tribbus/${_id}`}
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition border border-slate-200"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">
                      {name}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3">
                      <span className="font-medium text-indigo-600">{role}</span> ·{" "}
                      <span>{members.length} miembros</span>
                    </p>
                    <p className="text-xs text-indigo-600">
                      Ver Tribbu →
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-slate-200">
              <p className="text-slate-600 mb-4">
                No tienes Tribbus asignadas aún.
              </p>
              <Link
                to="/tribbus"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition"
              >
                Ver todas las Tribbus
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;