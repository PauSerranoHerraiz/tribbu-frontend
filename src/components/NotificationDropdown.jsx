import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

function NotificationDropdown({
  notifications,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
  onClose,
}) {
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
    const tribbuId = notification.tribbuId?._id || notification.tribbuId;
    
    if (notification.eventId && tribbuId) {
      return `/tribbus/${tribbuId}`;
    }
    if (tribbuId) {
      return `/tribbus/${tribbuId}`;
    }
    return "/tribbus";
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
        <h3 className="font-semibold text-slate-800">Notificaciones</h3>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={onMarkAllAsRead}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p className="text-sm">No tienes notificaciones</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {notifications.slice(0, 10).map((notification) => (
              <li
                key={notification._id}
                className={`p-3 hover:bg-slate-50 transition group relative ${
                  !notification.isRead ? "bg-indigo-50" : ""
                }`}
              >
                <Link
                  to={getNotificationLink(notification)}
                  onClick={() => {
                    if (!notification.isRead) {
                      onMarkAsRead(notification._id);
                    }
                    onClose();
                  }}
                  className="flex gap-3 pr-8"
                >
                  <span className="text-lg flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {notification.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {moment(notification.createdAt).fromNow()}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(notification._id);
                  }}
                  className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-100 rounded"
                  title="Eliminar"
                >
                  <svg
                    className="w-4 h-4 text-red-600"
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
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-3 border-t border-slate-200 text-center sticky bottom-0 bg-white">
        <Link
          to="/notifications"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          onClick={onClose}
        >
          Ver todas las notificaciones →
        </Link>
      </div>
    </div>
  );
}

export default NotificationDropdown;