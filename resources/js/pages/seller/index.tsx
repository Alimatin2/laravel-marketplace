import { SharedData, Vendor, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SellerLayout from '@/layouts/seller/layout';

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
        title: 'Seller Panel',
        href: '/seller',
    },
];

export default function Seller() {
  const { vendor } = usePage<SharedData & {vendor: Vendor}>().props;

  return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Vendor" />

          <SellerLayout vendor_id={vendor.id}>
              <div className="space-y-6">
                  <HeadingSmall title="Vendor Overview" description="Information about your vendor" />
                  <p>{vendor.name}</p>
                  <p>{vendor.owner_name}</p>
              </div>
          </SellerLayout>
      </AppLayout>
  );
}
