import React from 'react'
import Alert from '../Alert/Alert.tsx'

interface AlertItem {
    id: number;
    message: string;
}

interface AlertListProps {
    alerts: AlertItem[];
    closeAlert: (id: number) => void;
}

const AlertList: React.FC<AlertListProps> = ({alerts, closeAlert}) => {
  return (
    <div className="alert-list">
        {alerts.map((alert) => (
            <Alert
                key={alert.id}
                message={alert.message}
                onClose={() => closeAlert(alert.id)}
                backgroundColor={alert.backgroundColor}
            />
        ))}
    </div>
  );
};

export default AlertList