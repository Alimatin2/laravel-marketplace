// resources/js/Pages/seller/reservations/index.tsx

import TextLink from '@/components/text-link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import SellerLayout from '@/layouts/seller/layout';
import { cn } from '@/lib/utils';
import { Reservation, SharedData, Vendor, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Seller Panel', href: '/seller/{vendor}' },
  { title: 'Reservations', href: '/seller/{vendor}/reservations' },
];

export default function SellerReservations() {
  const { vendor, reservations } = usePage<SharedData & { vendor: Vendor, reservations: Reservation[] }>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SellerLayout vendor_id={vendor.id}>
        <Head title="Reservations" />
        <div className="flex flex-col gap-4 p-4">
          <Link href={route('seller.reservations.create', { vendor: vendor.id })} className={cn(buttonVariants({ variant: 'default' }), 'w-fit')}>
            <PlusIcon className="mr-2" /> Add Reservation
          </Link>

          <Table>
            <TableCaption>Vendor Reservations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{reservation.start}</TableCell>
                  <TableCell>{reservation.end}</TableCell>
                  <TableCell>{reservation.status ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <TextLink href={route('seller.reservations.edit', { vendor: vendor.id, reservation: reservation.id })}>
                      Edit
                    </TextLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SellerLayout>
    </AppLayout>
  );
}
