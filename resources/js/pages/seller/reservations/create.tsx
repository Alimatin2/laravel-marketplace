// resources/js/Pages/seller/reservations/create.tsx

import InputError from '@/components/ui/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import SellerLayout from '@/layouts/seller-layout';
import { BreadcrumbItem, Vendor } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import ReservationForm from './form';

export default function SellerReservationCreate() {
  const { vendor } = usePage<{ vendor: Vendor }>().props;

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
        <Head title="Create Reservation" />
        <div className="space-y-4 p-4">
          <h1 className="text-2xl font-bold">Create Reservation</h1>
          <ReservationForm vendor_id={vendor.id}/>
        </div>
      </SellerLayout>
    </AppLayout>
  );
}
