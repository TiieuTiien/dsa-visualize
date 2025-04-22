import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./NotificationList.css";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  duration: number;
  startTime: number;
  timerId?: ReturnType<typeof setTimeout>;
}

interface NotificationListProps {}

export interface NotificationListRef {
  addNotification: (
    message: string,
    type?: NotificationType,
    duration?: number
  ) => void;
}

const NotificationList = forwardRef<NotificationListRef, NotificationListProps>(
  (props, ref) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(
      new Map()
    );

    const addNotification = (
      message: string,
      type: NotificationType = "info",
      duration: number = 2000
    ) => {
      const newNotification: Notification = {
        id: Date.now() + Math.random(),
        message,
        type,
        duration,
        startTime: Date.now(),
      };
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    const removeNotification = useCallback(
      (id: number) => {
        setNotifications((prevNotifications) => {
          const updatedNotifications = prevNotifications.filter(
            (notificationItem) => notificationItem.id !== id
          );
          if (timersRef.current.has(id)) {
            clearTimeout(timersRef.current.get(id));
            timersRef.current.delete(id);
          }
          return updatedNotifications;
        });
      },
      [setNotifications]
    );

    useImperativeHandle(ref, () => ({
      addNotification,
    }));

    useEffect(() => {
      const currentTimers = timersRef.current;

      notifications.forEach((notification) => {
        if (!currentTimers.has(notification.id)) {
          const timer = setTimeout(() => {
            removeNotification(notification.id);
          }, notification.duration);

          currentTimers.set(notification.id, timer);
        }
      });

      return () => {
        const notificationIdsInCurrentState = new Set(
          notifications.map((n) => n.id)
        );
        currentTimers.forEach((timerID, notificationId) => {
          if (!notificationIdsInCurrentState.has(notificationId)) {
            clearTimeout(timerID);
          }
        });
      };
    }, [notifications, removeNotification]);

    useEffect(() => {
      const currentTimersOnUnmount = timersRef.current;

      return () => {
        currentTimersOnUnmount.forEach((timerId) => clearTimeout(timerId));
        currentTimersOnUnmount.clear();
      };
    }, []);

    return (
      <div className="notification-list">
        {notifications.map((notification: Notification) => (
          <div
            key={notification.id}
            className={`notification notification-${notification.type}`}
          >
            <div className="notification-content">{notification.message}</div>
            <button onClick={() => removeNotification(notification.id)}>
              x
            </button>
            <div
              className="notification-progress-bar"
              style={{ animationDuration: `${notification.duration}ms` }}
            />
          </div>
        ))}
      </div>
    );
  }
);

export default NotificationList;
