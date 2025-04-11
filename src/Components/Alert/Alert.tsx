import React, { useEffect, useRef } from "react";
import "./Alert.css";

interface AlertProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, duration = 5000, onClose }) => {
  // Store onClose in a ref so that it doesn’t change across renders
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className="alert-box">
      <div className="alert">
        {message}
        <button className="alert-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <div
        className="alert-progress"
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
}

export default Alert;