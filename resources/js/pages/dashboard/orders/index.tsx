import StatusBadge from "@/components/order/status-badge";
import TableFallback from "@/components/structure/table-fallback";
import TextLink from "@/components/text/text-link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { firstLetterUpperCase } from "@/helpers/first-letter-uppercase";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Order } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

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
    href: '/orders',
  },

];
export default function Orders() {
  const { orders } = usePage<{ orders: Order[] }>().props;

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Orders" />
        <div className="flex h-full flex-1 flex-col items-center gap-4 rounded-xl p-4">
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableFallback count={orders.length}>
            {
              orders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>{new Date(order.created_at).toDateString()}</TableCell>
                  <TableCell><StatusBadge status={order.status}/></TableCell>
                  <TableCell>
                    <TextLink href={route('orders.show', order.id)}>
                      Details
                    </TextLink>
                  </TableCell>
                </TableRow>
              ))
            }
            </TableFallback>
          </Table>
        </div>
      </AppLayout>
    );
}
