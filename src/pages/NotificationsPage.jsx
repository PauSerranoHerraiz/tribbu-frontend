import { useNotifications } from "../hooks/useNotifications";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

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
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Notificaciones</h1>
        {unreadNotifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="btn btn-sm btn-outline btn-primary"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            No tienes notificaciones
          </h2>
          <p className="text-slate-500">
            Cuando haya actividad en tus Tribbus, aparecerá aquí
          </p>
          <Link to="/tribbus" className="btn btn-primary mt-6">
            Ir a mis Tribbus
          </Link>
        </div>
      ) : (
        <>
          {unreadNotifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                Nuevas ({unreadNotifications.length})
              </h2>
              <div className="space-y-2">
                {unreadNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 hover:shadow-md transition group relative"
                  >
                    <Link
                      to={getNotificationLink(notification)}
                      onClick={() => markAsRead(notification._id)}
                      className="flex gap-4"
                    >
                      <span className="text-2xl flex-shrink-0">
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
                    <button
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
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {readNotifications.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-700">
                  Anteriores ({readNotifications.length})
                </h2>
                <button
                  onClick={() => {
                    readNotifications.forEach((n) => deleteNotification(n._id));
                  }}
                  className="btn btn-sm btn-ghost btn-error"
                >
                  Limpiar todas
                </button>
              </div>
              <div className="space-y-2">
                {readNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition group relative opacity-70 hover:opacity-100"
                  >
                    <Link
                      to={getNotificationLink(notification)}
                      className="flex gap-4"
                    >
                      <span className="text-2xl flex-shrink-0">
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
                    <button
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
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NotificationsPage;