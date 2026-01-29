import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import tribbuService from "../services/tribbu.service";
import eventService from "../services/event.service";
import moment from "moment";
import { motion } from "framer-motion";

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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        />
      </div>
    );

  if (!user) return null;

  if (loadingTribbus)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50 text-slate-700">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-6 py-8"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
          >
            Bienvenido/a {user?.name}! 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-600 mt-2"
          >
            Gestiona tus Tribbus y eventos desde un solo lugar
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Link
            to="/events"
            className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>📅</span>
            Ver todos los eventos
          </Link>
        </motion.div>
      </motion.header>

      <main className="px-6 grid gap-8 max-w-6xl mx-auto pb-8">
        {!loadingEvents && nextEvent && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border-l-8 border-indigo-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full blur-3xl -z-10 opacity-50" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">

                <div>
                  <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                    Próximo evento
                  </p>
                  <p className="text-xs text-slate-500">
                    {moment(nextEvent.start).fromNow()}
                  </p>
                </div>
              </div>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                PRÓXIMO
              </motion.span>
            </div>

            <Link
              to={`/tribbus/${nextEvent.tribbuId}`}
              className="block hover:opacity-75 transition"
            >
              <h3 className="text-3xl font-bold text-slate-800 mb-2">
                {nextEvent.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-indigo-600">📍</span>
                  {nextEvent.tribbuName}
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-violet-600">📅</span>
                  {moment(nextEvent.start).format("DD/MM/YYYY HH:mm")}
                </span>
              </div>
              {nextEvent.childId && (
                <p className="text-sm text-indigo-600 mt-3 flex items-center gap-2">
                  <span>👶</span>
                  {nextEvent.childId.name}
                </p>
              )}
              <motion.p
                whileHover={{ x: 5 }}
                className="text-sm text-indigo-600 mt-4 font-semibold inline-flex items-center gap-2"
              >
                Ver detalles <span>→</span>
              </motion.p>
            </Link>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-3xl shadow-2xl p-10 text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6TTAgMzZjMC00LjQxOCAzLjU4Mi04IDgtOHM4IDMuNTgyIDggOC0zLjU4MiA4LTggOC04LTMuNTgyLTgtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          

          <h2 className="text-2xl font-bold mb-3">Crear nuevo evento</h2>
          <p className="text-indigo-100 mb-6 max-w-md mx-auto">
            Organiza actividades para tu Tribbu con nuestro sistema de gestión inteligente
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/events"
              className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300"
            >
              + Ir al calendario
            </Link>
          </motion.div>
        </motion.section>

        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
          >
         
            Mis Tribbus
          </motion.h2>
          
          {tribbus.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tribbus.map((tribbu, index) => {
                const { name, _id, members = [] } = tribbu;
                const userMember = members.find(
                  (member) => String(member.userId?._id || member.userId) === String(user._id)
                );
                const role = userMember?.role || "SABIO";

                return (
                  <motion.div
                    key={_id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative"
                  >
                    <Link
                      to={`/tribbus/${_id}`}
                      className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 border-2 border-transparent hover:border-indigo-200 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                      
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {name}
                        </h3>

                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 text-xs font-bold rounded-full">
                            {role}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="font-semibold text-slate-800">👥</span>
                          {members.length} {members.length === 1 ? "miembro" : "miembros"}
                        </p>
                      </div>

                      <motion.p
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="text-xs text-indigo-600 mt-4 font-semibold flex items-center gap-2"
                      >
                        Ver Tribbu <span>→</span>
                      </motion.p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-slate-200"
            >

              <p className="text-slate-600 mb-6 text-lg">
                No tienes Tribbus asignadas aún.
              </p>
              <Link
                to="/tribbus"
                className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Ver todas las Tribbus
              </Link>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;