import TextLink from '@/components/text/text-link';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { firstLetterUpperCase } from '@/helpers/first-letter-uppercase';
import AppLayout from '@/layouts/app-layout';
import SellerLayout from '@/layouts/seller-layout';
import { cn } from '@/lib/utils';
import { Member, Product, SharedData, User, Vendor, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon } from 'lucide-react';

//TODO breadcrumbs

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Seller Panel',
        href: '/seller/{vendor}',
    },
    {
        title: 'Products',
        href: '/seller/{vendor}/products',
    },
];

export default function SellerUsers() {
    const { vendor, users } = usePage<SharedData & { vendor: Vendor, users: Member[]}>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <SellerLayout vendor_id={vendor.id}>

            <Head title="Dashboard Products" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

              <Link href={route('seller.users.create', {vendor: vendor.id})} className={cn(buttonVariants({ variant: 'default' }), 'w-fit')}>
                <PlusIcon />
                Invite User
              </Link>

              <Table>
                  <TableCaption>Products</TableCaption>
                  <TableHeader>
                      <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                      </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((user: Member) => (
                      <TableRow key={user.user.id}>
                        <TableCell>{user.user.id}</TableCell>
                        <TableCell>{user.user.name}</TableCell>
                        <TableCell>{user.user.email}</TableCell>
                        {
                          user.status ?
                          <TableCell>{firstLetterUpperCase(user.status)}</TableCell>
                          :
                          <TableCell>Member</TableCell>
                        }
                      </TableRow>
                    ))}
                  </TableBody>

              </Table>

            </div>

          </SellerLayout>

        </AppLayout>
    );
}