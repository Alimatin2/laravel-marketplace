import { NavMain } from '@/components/structure/nav-main';
import Heading from '@/components/text/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Vendor, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, CalendarClock, Contact, Handshake, LayoutDashboard } from 'lucide-react';
import { type PropsWithChildren } from 'react';

type SellerLayoutProps = PropsWithChildren<{
  vendor_id: number;
}>;

export default function SellerLayout({ children, vendor_id }: SellerLayoutProps) {
  const sidebarNavItems: NavItem[] = [
    {
        title: 'Vendor',
        href: `/seller/${vendor_id}`,
        icon: LayoutDashboard,
    },
    {
        title: 'Reservations',
        href: `/seller/${vendor_id}/reservations`,
        icon: Calendar,
    },
    {
        title: 'Bookings',
        href: `/seller/${vendor_id}/bookings`,
        icon: CalendarClock,
    },
    {
        title: 'Members',
        href: `/seller/${vendor_id}/members`,
        icon: Contact,
    },
    {
        title: 'Invitations',
        href: `/seller/${vendor_id}/invitations`,
        icon: Handshake,
    },
  ];

  return (
      <div className="px-4 py-6">
          <div className="flex flex-col space-y-8 lg:flex-row lg:gap-12">
            <aside className="w-full max-w-xl lg:w-48">
                <NavMain items={sidebarNavItems} />
            </aside>

            <Separator className="my-6 md:hidden" />
            <div className="w-full">
                {children}
            </div>
          </div>
      </div>
  );
}
