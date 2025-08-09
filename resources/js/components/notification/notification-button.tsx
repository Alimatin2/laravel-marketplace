import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Bell } from "lucide-react";

export default function NotificationButton() {
  const { notification_count } = usePage<SharedData & {notification_count: number}>().props;

  return(
    <div>
      <Link href={route('notifications')} className="relative hover:opacity-75 transition-all">
        { notification_count > 0 && <p className="absolute bottom-3 left-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs text-center scale-75">{notification_count}</p>}
        <Bell size={20} color="gray"/>  
      </Link>
    </div>
  );
}