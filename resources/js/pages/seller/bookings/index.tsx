import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, IBooking, Order, Vendor } from '@/types';
import { MoreHorizontalIcon } from 'lucide-react';
import { Head, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import SellerLayout from '@/layouts/seller/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Seller',
        href: '/dashboard/admin',
    },
    {
        title: 'Orders',
        href: '/dashboard/admin/orders',
    },
];

//TODO booking user

export default function VendorBookings() {

    const { bookings, vendor } = usePage<{ bookings: IBooking[], vendor: Vendor }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <SellerLayout vendor_id={vendor.id}>
            <Head title="Dashboard Orders" />
            <div className="flex h-full flex-1 items-start flex-col gap-4 rounded-xl p-4">
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
            </div>
          </SellerLayout>
        </AppLayout>
    );
}