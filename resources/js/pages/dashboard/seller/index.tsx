import TextLink from "@/components/text/text-link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Order, Vendor } from "@/types";
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
    title: 'Vendors',
    href: '/vendors',
  },

];
export default function Vendors() {
  const { vendors } = usePage<{ vendors: Vendor[] }>().props;

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Vendors" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Seller Dashboard</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor, i) => (
              <TableRow key={i}>
                <TableCell>{vendor.id}</TableCell>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{new Date(vendor.created_at).toDateString()}</TableCell>
                <TableCell>{vendor.owner.name}</TableCell>
                <TableCell>
                  <TextLink href={route('seller.dashboard', vendor.id)}>
                    Details
                  </TextLink>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
      </AppLayout>
    );
}
