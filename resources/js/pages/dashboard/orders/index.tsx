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
          {
            orders.length > 0 
            ?
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
            <TableBody>
              {
                orders.map((order) => (
                  <TableRow>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.total_price}</TableCell>
                    <TableCell>{new Date(order.created_at).toDateString()}</TableCell>
                    <TableCell>{firstLetterUpperCase(order.status)}</TableCell>
                    <TableCell>
                      <TextLink href={route('orders.show', order.id)}>
                        Details
                      </TextLink>
                    </TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
            :
            <p>You have no orders.</p>
          }
        </div>
      </AppLayout>
    );
}
