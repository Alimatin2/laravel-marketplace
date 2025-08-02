import { Order } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function CheckoutCreate() {
  const { order, redirect_url } = usePage<{ order: Order; redirect_url?: string }>().props;

  useEffect(() => {
    if (redirect_url) {
      window.location.href = redirect_url;
    }
  }, [redirect_url]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>{order.id}</h1>
      <h1>{order.name}</h1>
      <h1>{order.email}</h1>
      <h1>{order.address}</h1>
      <h1>{order.postal_code}</h1>
    </div>
  );
}
