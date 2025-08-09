import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Notification, type BreadcrumbItem, type Order, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInitials } from '@/hooks/use-initials';
import TextLink from '@/components/text/text-link';
import { Package, ShoppingCart, User } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import NotificationCard from '@/components/notification/notification-card';

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
      title: 'Notifications',
      href: '/dashboard/notifications',
    },
];

export default function Notifications() {
    const { notifications } = usePage<SharedData & { notifications: Notification[]}>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {
                    notifications.map((notification, i) => {
                        return(
                            <NotificationCard key={i} notification={notification}/>
                        );
                    })
                }
            </div>
        </AppLayout>
    );
}
