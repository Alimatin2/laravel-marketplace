import { Check, Loader, LucideIcon, Meh, X } from "lucide-react";
import StatusBadge from "./status-badge";
import { Progress } from "../ui/progress";
import { Value } from "@radix-ui/react-select";

type StatusKey = 'failed' | 'pending' | 'complete' | 'default';

interface Status {
  value: number,
  icon: LucideIcon,
  color: string,
}

interface OrderProgressProps {
  status: string;
}

const statusList: Record<StatusKey, Status> = {
  failed: {
    value: 20,
    icon: X,
    color: "bg-red-500"
  },
  pending: {
    value: 60,
    icon: Loader,
    color: "bg-yellow-500"
  },
  complete: {
    value: 100,
    icon: Check,
    color: "bg-green-500"
  },
  default: {
    value: 20,
    icon: Meh,
    color: "bg-gray-500"
  }
}

export default function OrderProgress({ status }: OrderProgressProps) {

  const currentStatus = statusList[status as StatusKey] || statusList.default

  return(
    <div className="flex gap-2 items-center backdrop-blur-2xl p-2 rounded-md">
      <X color={currentStatus.color.split("-")[1]} size={17}/>
      <Progress value={currentStatus.value} bar_color={currentStatus.color} className="lg:w-1/2"/>
      <StatusBadge status={status}/>
    </div>
  );
}