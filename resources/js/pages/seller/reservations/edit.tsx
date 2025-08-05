import InputError from '@/components/ui/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import SellerLayout from '@/layouts/seller-layout';
import { BreadcrumbItem, Reservation, ReservationForm, SharedData, Vendor } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Seller Panel', href: '/seller/{vendor}' },
  { title: 'Reservations', href: '/seller/{vendor}/reservations' },
  { title: 'Edit', href: '#' },
];

export default function SellerReservationEdit() {
  const { vendor, reservation } = usePage<SharedData & { vendor: Vendor; reservation: Reservation }>().props;

  const { data, setData, put, processing, errors } = useForm<Required<ReservationForm>>({
    name: reservation.name ?? '',
    summary: reservation.summary ?? '',
    description: reservation.description ?? '',
    start: reservation.start ?? '',
    end: reservation.end ?? '',
    price: reservation.price ?? 0,
    off_days: reservation.off_days ?? [],
    exp_date: reservation.exp_date ?? '',
    status: reservation.status ?? true,
    vendor_id: reservation.vendor_id ?? vendor.id,
  });

  const handleCheckboxChange = (day: string) => {
    setData('off_days', data.off_days.includes(day)
      ? data.off_days.filter(d => d !== day)
      : [...data.off_days, day]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('seller.reservations.update', { vendor: vendor.id, reservation: reservation.id }));
  };

  const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SellerLayout vendor_id={vendor.id}>
        <Head title="Edit Reservation" />
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">Edit Reservation</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
              <InputError message={errors.name} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="summary">Summary</Label>
              <Input id="summary" value={data.summary} onChange={e => setData('summary', e.target.value)} />
              <InputError message={errors.summary} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} />
              <InputError message={errors.description} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price (Per minute)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={50000}
                value={data.price}
                onChange={e => setData('price', Number(e.target.value))}
              />
              <InputError message={errors.price} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="start">Start Time</Label>
              <Input id="start" value={data.start} onChange={e => setData('start', e.target.value)} />
              <InputError message={errors.start} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="end">End Time</Label>
              <Input id="end" value={data.end} onChange={e => setData('end', e.target.value)} />
              <InputError message={errors.end} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="off_days">Off Days</Label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map(day => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.off_days.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
              <InputError message={errors.off_days} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{data.status ? 'Active' : 'Inactive'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setData('status', true)}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setData('status', false)}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button type="submit" disabled={processing}>Update Reservation</Button>
          </form>
        </div>
      </SellerLayout>
    </AppLayout>
  );
}
