import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";

export type ReservationForm = {
  name: string;
  summary: string | "";
  description: string | "";
  start: string;
  end: string;
  price: number;
  duration: number;
  session_duration: number;
  off_days: string[];
  status: boolean;
  vendor_id: number;
}

interface ReservationFormProps {
  values?: ReservationForm,
  vendor_id: number,
  id?: number,
}

export default function ReservationForm({ values, vendor_id, id } : ReservationFormProps) {

  let currentValues: ReservationForm = {
    name: '',
    summary: '',
    description: '',
    start: '',
    end: '',
    price: 0,
    duration: 0,
    session_duration: 0,
    off_days: [],
    status: true,
    vendor_id: vendor_id,
  };

  if(values) {
    currentValues = {...values}
  }

  const handleCheckboxChange = (day: string) => {
    setData('off_days', data.off_days.includes(day)
      ? data.off_days.filter(d => d !== day)
      : [...data.off_days, day]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(values && id) {
      put(route('seller.reservations.update', { vendor: vendor_id, reservation: id }));
    } else {
      post(route('seller.reservations.store', { vendor: vendor_id }));
    }

  };

  const daysOfWeek = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
    ];

  const { data, setData, post, put, processing, errors } = useForm<Required<ReservationForm>>(
    {...currentValues}
  );

  return(
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
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
        <Label htmlFor="price">Price<span className="text-red-500">*</span></Label>
        <Input id="price" type='number' min={0} step={50000} value={data.price} onChange={e => setData('price', Number(e.target.value))} />
        <InputError message={errors.price} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Duration<span className="text-red-500">*</span></Label>
        <Input id="duration" type='number' min={7} step={1} max={14} value={data.duration} onChange={e => setData('duration', Number(e.target.value))} />
        <InputError message={errors.duration} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Session Duration(Minutes)<span className="text-red-500">*</span></Label>
        <Input id="session_duration" type='number' min={30} step={30} max={120} value={data.session_duration} onChange={e => setData('session_duration', Number(e.target.value))} />
        <InputError message={errors.session_duration} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="start">Start Time<span className="text-red-500">*</span></Label>
        <Input id="start" value={data.start} onChange={e => setData('start', e.target.value)} />
        <InputError message={errors.start} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="end">End Time<span className="text-red-500">*</span></Label>
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

      <Button type="submit" disabled={processing}>Submit Reservation</Button>
    </form>
  );
}