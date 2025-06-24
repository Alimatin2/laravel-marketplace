import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Order, Payment, PaymentResponse, PaymentSuccess } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
export default function PaymentVerify() {
  const { payment, responseData, order } = usePage<{ payment: Payment, responseData: PaymentSuccess, order: Order | null }>().props;
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

    return (
        <div className="flex flex-col items-center mt-10 h-screen">
            <div className="flex flex-col items-start justify-center border border-green-500 rounded-md p-4 gap-5 max-w-2xl">
              <h1 className="text-xl mx-auto">Payment successful</h1>
              <div className="text-sm text-gray-500">
                <p>Payment ID: {payment.id}</p>
                <p>Amount: {payment.price}</p>
                <p>Payment ID: {responseData.ref_id}</p>
                <p>Card Pan: {responseData.card_pan}</p>
                <p>Fee: {responseData.fee}</p>
              </div>
              <div className="flex flex-wrap items-center w-fit border rounded-md p-4 gap-2">
              {
                order?.order_details.map((item) => (
                  <div className="flex flex-wrap items-center w-fit border rounded-md p-4 gap-2"> 
                    <img src={`/storage/products/${item.product.image}`} alt={item.product.name} className="w-40 h-40 object-cover rounded-md" />
                    <p className="text-sm text-gray-500">{item.product.name} x {item.quantity}</p>
                  </div>
                ))
              }
              </div>
              <Link href="/dashboard/orders" className={`${buttonVariants({ variant: 'outline' })} mx-auto`}>Back to orders</Link>
            </div>
        </div>
    );
}