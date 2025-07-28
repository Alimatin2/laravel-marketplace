import { firstLetterUpperCase } from "@/helpers/first-letter-uppercase";
import { Button } from "../ui/button";
import { act, ButtonHTMLAttributes } from "react";
import { useForm } from "@inertiajs/react";


interface NotificationActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: string;
  name: string;
  notification_id: number;
}

export default function NotificationAction({ action, name, notification_id }: NotificationActionProps) {
  const { post, put, processing, errors } = useForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(action);
    put(route('notification.update', notification_id));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" size="sm" disabled={processing}>
        {firstLetterUpperCase(name)}
      </Button>
    </form>
  );
}