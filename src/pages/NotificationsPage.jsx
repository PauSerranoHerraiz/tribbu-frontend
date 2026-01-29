import { useNotifications } from "../hooks/useNotifications";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import { motion, AnimatePresence } from "framer-motion";

moment.locale("es");

function NotificationsPage() {
  const { notifications, loading, markAsRead, deleteNotification, markAllAsRead } =
    useNotifications();

  const getNotificationIcon = (type) => {
    const icons = {
      event_created: "📅",
      event_updated: "📝",
      event_deleted: "🗑️",
      member_joined: "👥",
      member_left: "👋",
      member_role_changed: "🔄",
      comment_added: "💬",
      tribbu_updated: "⚙️",
    };
    return icons[type] || "🔔";
  };

  const getNotificationLink = (notification) => {
    if (notification.eventId) return `/tribbus/${notification.tribbuId?._id || notification.tribbuId}`;
    if (notification.tribbuId) return `/tribbus/${notification.tribbuId?._id || notification.tribbuId}`;
    return "/tribbus";
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-3">

            Notificaciones
          </h1>
          <p className="text-slate-600 mt-2">
            {unreadNotifications.length > 0
              ? `Tienes ${unreadNotifications.length} ${
                  unreadNotifications.length === 1 ? "notificación nueva" : "notificaciones nuevas"
                }`
              : "Estás al día"}
          </p>
        </div>
        {unreadNotifications.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllAsRead}
            className="btn btn-sm bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-none hover:shadow-lg"
          >
            ✓ Marcar todas como leídas
          </motion.button>
        )}
      </motion.div>

      {notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >

          <h2 className="text-3xl font-bold text-slate-700 mb-3">
            Todo tranquilo por aquí
          </h2>
          <p className="text-slate-500 mb-8">
            Cuando haya actividad en tus Tribbus, aparecerá aquí
          </p>
          <Link
            to="/tribbus"
            className="inline-block bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-xl hover:scale-105 transition-all"
          >
            Ir a mis Tribbus →
          </Link>
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {unreadNotifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-indigo-600 rounded-full"
                  />
                  <h2 className="text-2xl font-bold text-slate-800">
                    Nuevas ({unreadNotifications.length})
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {unreadNotifications.map((notification, index) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-indigo-50 to-violet-50 border-2 border-indigo-200 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-violet-200 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity" />
                      
                      <Link
                        to={getNotificationLink(notification)}
                        onClick={() => markAsRead(notification._id)}
                        className="flex gap-4"
                      >
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-3xl flex-shrink-0"
                        >
                          {getNotificationIcon(notification.type)}
                        </motion.span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 mb-2 text-lg">
                            {notification.title}
                          </p>
                          <p className="text-sm text-slate-700 mb-3">
                            {notification.message}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                              ⏰ {moment(notification.createdAt).fromNow()}
                            </span>
                            {notification.tribbuId?.name && (
                              <>
                                <span>•</span>
                                <span className="font-semibold text-indigo-700">
                                  📍 {notification.tribbuId.name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          deleteNotification(notification._id);
                        }}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all p-2 bg-red-100 hover:bg-red-200 rounded-xl"
                        title="Eliminar"
                      >
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {readNotifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-700">
                  Anteriores ({readNotifications.length})
                </h2>
 
              </div>
              
              <div className="space-y-3">
                {readNotifications.map((notification, index) => (
                  <motion.div
                    key={notification._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all group relative opacity-60 hover:opacity-100"
                  >
                    <Link
                      to={getNotificationLink(notification)}
                      className="flex gap-4"
                    >
                      <span className="text-2xl flex-shrink-0 grayscale">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 mb-1">
                          {notification.title}
                        </p>
                        <p className="text-sm text-slate-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{moment(notification.createdAt).fromNow()}</span>
                          {notification.tribbuId?.name && (
                            <>
                              <span>•</span>
                              <span className="font-medium">
                                {notification.tribbuId.name}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        deleteNotification(notification._id);
                      }}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition p-2 hover:bg-red-100 rounded-lg"
                      title="Eliminar"
                    >
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export default NotificationsPage;