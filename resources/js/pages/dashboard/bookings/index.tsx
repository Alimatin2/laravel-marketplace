import TextLink from "@/components/text-link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { IBooking, BreadcrumbItem, Order } from "@/types";
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
    title: 'Bookings',
    href: '/bookings',
  },

];
export default function Booking() {
  const { bookings } = usePage<{ bookings: IBooking[] }>().props;

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Bookings" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.price}</TableCell>
                <TableCell>{new Date(booking.date).toDateString()}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{new Date(booking.created_at).toDateString()}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
      </AppLayout>
    );
}
