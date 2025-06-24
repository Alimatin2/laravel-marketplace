import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Order } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
  },
  {
    title: 'Order',
    href: '/dashboard/orders/show',
  },
];

export default function OrderShow() {
  const { order } = usePage<{ order: Order }>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Order ${order.id}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold">Order#{order.id}</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Order Details</h2>
            <p className="text-sm text-gray-500">Last updated: {new Date(order.updated_at).toDateString()}</p>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
            <p className="text-sm text-gray-500">Total price: {order.total_price}</p>
            <p className="text-sm text-gray-500">Recipient: {order.name}</p>
            <p className="text-sm text-gray-500">Email: {order.email}</p>
            <p className="text-sm text-gray-500">Address: {order.address}</p>
            <p className="text-sm text-gray-500">Postal code: {order.postal_code}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Order Items</h2>
            <div className="flex flex-col gap-2">
            {
              order.order_details.map((detail, i) => {
                return(
                  <div className="flex flex-wrap items-center w-fit border rounded-md p-4 gap-2"> 
                    <img src={`/storage/products/${detail.product.image}`} alt={detail.product.name} className="w-40 h-40 object-cover rounded-md" />
                    <p className="text-sm text-gray-500">{detail.product.name} x {detail.quantity}</p>
                  </div>
                );
              })
            }
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

