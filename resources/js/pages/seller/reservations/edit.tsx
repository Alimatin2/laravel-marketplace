import InputError from '@/components/ui/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import SellerLayout from '@/layouts/seller-layout';
import { BreadcrumbItem, Reservation, SharedData, Vendor } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import ReservationForm from './form';

export default function SellerReservationEdit() {
  const { vendor, reservation } = usePage<SharedData & { vendor: Vendor; reservation: Reservation }>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    { 
      title: 'Seller Panel',
      href: `/seller/${vendor.id}`
    },
    { 
      title: 'Reservations',
      href: `/seller/${vendor.id}/reservations`
    },
    { 
      title: 'Edit',
      href: '#'
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SellerLayout vendor_id={vendor.id}>
        <Head title="Edit Reservation" />
        <div className="space-y-4 p-4">
          <ReservationForm values={reservation} vendor_id={vendor.id} id={reservation.id}/>
        </div>
      </SellerLayout>
    </AppLayout>
  );
}
