import TableFallback from '@/components/structure/table-fallback';
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
import { PencilIcon, PlusIcon, SquarePen, Trash2 } from 'lucide-react';

export default function SellerMembers() {
    const { vendor, members } = usePage<SharedData & { vendor: Vendor, members: Member[]}>().props;
    
    const breadcrumbs: BreadcrumbItem[] = [
      {
          title: 'Dashboard',
          href: '/dashboard',
      },
      {
          title: 'Seller Panel',
          href: `/seller/${vendor.id}`,
      },
      {
          title: 'Members',
          href: `/seller/${vendor.id}/members`,
      },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <SellerLayout vendor_id={vendor.id}>
            <Head title="Vendor Members" />
              <Link href={route('seller.invitations.create', {vendor: vendor.id})} className={cn(buttonVariants({ variant: 'outline' }), 'w-fit')}>
                <PlusIcon />
                Invite User
              </Link>

              <Table>
                  <TableCaption>Members</TableCaption>
                  <TableHeader>
                      <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Actions</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableFallback count={members.length}>
                    {members.map((member: Member, i) => (
                      <TableRow key={i}>
                        <TableCell>{member.id}</TableCell>
                        <TableCell>{member.user.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{firstLetterUpperCase(member.role)}</TableCell>
                        <TableCell className="flex gap-2">
                          <SquarePen size={17} color='cyan'/>
                          <Trash2 size={17} color='red'/>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableFallback>
              </Table>
          </SellerLayout>

        </AppLayout>
    );
}