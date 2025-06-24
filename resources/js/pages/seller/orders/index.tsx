import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Order, OrderDetail, Vendor } from '@/types';
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

//TODO Fix order

export default function VendorOrders() {
    const [filter, setFilter] = useState<string>('all');
    const [priceSort, setPriceSort] = useState<string>('highest');

    const { orders, vendor } = usePage<{ orders: OrderDetail[], vendor: Vendor }>().props;

    const sortedOrders = orders.sort((a, b) => {
        if (priceSort === 'highest') {
            return b.price - a.price;
        } else {
            return a.price - b.price;
        }
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <SellerLayout vendor_id={vendor.id}>
            <Head title="Dashboard Orders" />
            <div className="flex h-full flex-1 items-start flex-col gap-4 rounded-xl p-4">
                <div className='flex gap-2'>
                    <Select onValueChange={(value) => setFilter(value)} defaultValue="all">
                        <SelectTrigger className='w-fit'>
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setPriceSort(value)} defaultValue="highest">
                        <SelectTrigger className='w-fit'>
                            <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="highest">Highest</SelectItem>
                            <SelectItem value="lowest">Lowest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableCaption>Orders</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order: OrderDetail) => (
                            (filter === 'all' /*|| order.status === filter*/) && (
                        <TableRow key={order.id}> 
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.product_id}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>
                                <TextLink href={"#"}>
                                Edit
                                </TextLink>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </div>
          </SellerLayout>
        </AppLayout>
    );
}