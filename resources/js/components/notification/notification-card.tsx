import { Notification } from "@/types";
import NotificationAction from "./notification/notification-action";

interface NotificationCardProps {
  notification: Notification;
}

type NotificationForm = {
  notification_id: number,
}

const getActions = (reference_type: string, reference_id: number) => {
  let actions = [];
  switch (reference_type) {
    case 'App\\Models\\VendorInvitation':
      actions.push(["accept", route('vendor.invitation.accept', reference_id)]);
      actions.push(["decline", route('vendor.invitation.accept', reference_id)]);
      break;
  }
  return actions;
}

export default function NotificationCard({ notification }: NotificationCardProps) {
  const actions = getActions(notification.reference_type, notification.reference_id);
  return(
    <div className="space-y-1 rounded-md border p-4">
      <h2 className="text-sm text-gray-500">Notification</h2>
      <p>{notification.message}</p>
      {
      notification.action_taken ?
      <p className="text-xs text-gray-500">{notification.action_taken}</p>
      :
      actions && (
        <div className="flex gap-2">
          {
            actions.map((action,i) => {
                return (
                <NotificationAction key={i} action={action[1]} name={action[0]} notification_id={notification.id}/>
                );
            })
          }
        </div>
      )}
    </div>
  );
}