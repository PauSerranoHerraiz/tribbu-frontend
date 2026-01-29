import { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import notificationService from "../services/notification.service";

export const useNotifications = () => {
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(() => {
    if (!user || authLoading) return;

    setLoading(true);
    notificationService
      .getNotifications()
      .then((res) => {
        setNotifications(res.data);
        const unread = res.data.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      })
      .catch((err) => console.error("Error fetching notifications:", err))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  const fetchUnreadCount = useCallback(() => {
    if (!user || authLoading) return;

    notificationService
      .getUnreadCount()
      .then((res) => setUnreadCount(res.data.count))
      .catch((err) => console.error("Error fetching unread count:", err));
  }, [user, authLoading]);

  const markAsRead = useCallback((notificationId) => {
    notificationService
      .markAsRead(notificationId)
      .then(() => {
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      })
      .catch((err) => console.error("Error marking as read:", err));
  }, []);

  const markAllAsRead = useCallback(() => {
    notificationService
      .markAllAsRead()
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      })
      .catch((err) => console.error("Error marking all as read:", err));
  }, []);

  const deleteNotification = useCallback((notificationId) => {
    notificationService
      .deleteNotification(notificationId)
      .then(() => {
        setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      })
      .catch((err) => console.error("Error deleting notification:", err));
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications,
  };
};