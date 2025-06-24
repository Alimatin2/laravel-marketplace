import { Button } from "./ui/button";

interface ReservationHourButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hour: string;
  isSelected: boolean;
}

export default function ReservationHourButton({ hour, isSelected, ...buttonProps }: ReservationHourButtonProps) {
  return (
    <Button
      type="button"
      className={`
        text-sm rounded-xl px-4 py-3 text-center transition
        ${isSelected 
          ? "bg-primary text-white ring-2 ring-primary font-semibold" 
          : "bg-muted dark:bg-white/10 text-foreground hover:bg-primary hover:text-white"}
      `}
      {...buttonProps}
    >
      {hour}
    </Button>
  );
}