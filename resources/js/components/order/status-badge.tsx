type StatusKey = 'failed' | 'pending' | 'complete' | 'default';

interface Status {
  text?: string;
  forecolor: string;
  backcolor: string;
}

const statusList: Record<StatusKey, Status> = {
  failed: {
    text: "Failed",
    forecolor: "text-red-300",
    backcolor: "bg-red-900",
  },
  pending: {
    text: "Pending",
    forecolor: "text-yellow-300",
    backcolor: "bg-yellow-900",
  },
  complete: {
    text: "Complete",
    forecolor: "text-green-300",
    backcolor: "bg-green-900",
  },
  default: {
    forecolor: "text-gray-300",
    backcolor: "bg-gray-900",
  },
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const currentStatus = statusList[status as StatusKey] || statusList.default;

  return (
    <div
      className={`rounded-sm ${currentStatus.backcolor} ${currentStatus.forecolor} w-fit px-1 text-sm font-medium`}
    >
      {currentStatus.text || status}
    </div>
  );
}
