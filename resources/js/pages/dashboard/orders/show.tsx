import InfoCol from "@/components/order/info-col";
import OrderProgress from "@/components/order/progress";
import StatusBadge from "@/components/order/status-badge";
import Heading from "@/components/text/heading";
import { Progress } from "@/components/ui/progress";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { firstLetterUpperCase } from "@/helpers/first-letter-uppercase";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Order, OrderDetail } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { X } from "lucide-react";

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
  const { order } = usePage<{ order: Order, order_details: OrderDetail[] }>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Order ${order.id}`} />
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">{`Order #${order.id}`}</h2>
        <OrderProgress status={order.status}/>
        <div className="flex flex-wrap gap-10">
          <InfoCol
            title="Recipient"
            description={order.name}
          />
          <InfoCol
            title="Status"
            description={firstLetterUpperCase(order.name)}
          />
          <InfoCol
            title="Total"
            description={order.total_price.toLocaleString()}
          />
          <InfoCol
            title="Email"
            description={order.email}
          />
          <InfoCol
            title="Address"
            description={<p>{order.address} <span className="text-muted-foreground text-sm">{order.postal_code}</span></p>}
          />
        </div>
        <Table className="lg:w-1/2">
          <TableHeader>
            <TableRow>
              <TableHead>
                ID
              </TableHead>
              <TableHead>
                Order
              </TableHead>
              <TableHead>
                Product
              </TableHead>
              <TableHead>
                Price
              </TableHead>
              <TableHead>
                Total Price
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </AppLayout>
  );
}

